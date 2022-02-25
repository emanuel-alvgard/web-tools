let s = require('./structure_lib.js');
let p = require('./parse_lib.js');
let http = require('http');
let https = require('https');

// BUFFER TYPES
function Request_Read(size, length) {
    this.size = size,
    this.length = length,
    this.free = s.queue_create(length),
    this.done = s.queue_create(length),
    this.data = new Array(length),
    this.client = new Array(length),
    this.stream = new Array(length),
    this.timeout = new Array(length),
    this.start = new Array(length)
};

function Request_Write(size, length) {
    this.size = size,
    this.length = length,
    this.free = s.queue_create(length),
    this.done = s.queue_create(length),
    this.data = new Array(length),
    this.client = new Array(length),
    this.stream = new Array(length),
    this.timeout = new Array(length),
    this.start = new Array(length)
};


function Response_Read(size, length) {
    this.size = size,
    this.length = length,
    this.free = s.queue_create(length),
    this.done = s.queue_create(length),
    this.data = new Array(length),
    this.client = new Array(length),
    this.stream = new Array(length),
    this.timeout = new Array(length),
    this.start = new Array(length)
};

function Response_Write(size, length) {
    this.size = size,
    this.length = length,
    this.free = s.queue_create(length),
    this.done = s.queue_create(length),
    this.data = new Array(length),
    this.client = new Array(length),
    this.stream = new Array(length),
    this.timeout = new Array(length),
    this.start = new Array(length)
};

function Buffer(size, length) {
    
    let result = [
        new Request_Read(size, length),
        new Request_Write(size, length),
        new Response_Read(size, length),
        new Response_Write(size, length)
    ];

    let i = 0;
    while (i < length) {
        s.queue_add(i, result[0].free);
        s.queue_add(i, result[1].free);
        s.queue_add(i, result[1].free);
        s.queue_add(i, result[1].free);
        i += 1;
    }

    return result;
};

let buffers = [
    Buffer(10, 10),
    Buffer(50, 10),
    Buffer(1000, 10),
    Buffer(100000, 1),
    Buffer(1000000, 1)
];

let queues = [
    s.queue_create(5), // request_read
    s.queue_create(5), // request_write
    s.queue_create(5), // response_read
    s.queue_create(5), // response_write
];


// SELECT
// @DONE
function http_select_buffer(size, buffers, queues, type) {

    // TYPE
    let t = null;
    switch (type) {
        case 'request_read': t = 0; break;
        case 'request_write': t = 1; break;
        case 'response_read': t = 2; break;
        case 'response_write': t = 3; break;
    }

    // GET LEVEL
    let len = buffers.length;
    let i = 0;
    while (true) {
        if (i >= len) { return false; }
        if (size <= buffers[i][t].size) { break; }
        i += 1;
    }

    // ADD TO BUFFER QUEUE
    s.queue_add(i, queues[t]);

    return buffers[i][t];
}



// USE
// @DONE
function http_use_buffer(buffers, queues, type) {

    // TYPE
    let t = null;
    switch (type) {
        case 'request_read': t = 0; break;
        case 'request_write': t = 1; break;
        case 'response_read': t = 2; break;
        case 'response_write': t = 3; break;
    }

    // GET LEVEL
    let level = s.queue_remove(queues[t]);
    if (level === false) { return false; }

    return buffers[level][t];
}

/* @TEST
http_select_buffer(1, buffers, queues, 'request_read');
http_select_buffer(40, buffers, queues, 'request_read');
http_select_buffer(500, buffers, queues, 'request_read');
console.log(queues[0]);

http_use_buffer(buffers, queues, 'request_read');
console.log(queues[0]);
http_use_buffer(buffers, queues, 'request_read');
console.log(queues[0]);
http_use_buffer(buffers, queues, 'request_read');
console.log(queues[0]);
*/


// @NOT
function http_timeout(request, timer, timeout) {

    let time = performance.now();
    
    if (time - timer[0] >= timeout) {
        request.connection.destroy();
        return;
    }
}



// @ADD support for tls
// @ADD support for streaming data larger than 1MB 
function http_server(tls, port, timeout_external, timeout_internal, buffers, queues) {

    let server = http.createServer(function (req, res) {

        // START TIMER
        let start = [performance.now()];
        let timer = setInterval(http_timeout, 0, req, start, 1000);

        // SELECT BUFFER
        let size = null;
        let buffer = null;
        let index = null;

        // GET
        if (req.method === 'GET') {

            // BUFFER AND INDEX
            size = req.url.length;
            if (size > 2048) { req.connection.destroy(); }
            console.log(size);
            buffer = http_select_buffer(size, buffers, queues, 'request_read');
            if (buffer === false) { req.connection.destroy(); }
            index = s.queue_remove(buffer.free);
            if (index === false) { req.connection.destroy(); }

            // READ INTO BUFFER
            buffer.start[index] = start;
            buffer.data[index] = req.url;
            buffer.client[index] = res;
            s.queue_add(index, buffer.done);
        }

        // POST
        if (req.method === 'POST') {

            req.on('data', function (data) {

                // BUFFER AND INDEX
                size = parseInt(req.headers['content-length']);
                if (Number.isInteger(size) === false) { req.connection.destroy(); }
                buffer = http_select_buffer(size, buffers, queues, 'request_read');
                if (buffer === false) { req.connection.destroy(); }
                if (index === null) {
                    index = s.queue_remove(buffer.free);
                    if (index !== false) {
                        buffer.start[index] = start;
                        buffer.data[index] = '';
                    }
                }
                if (index === false) { req.connection.destroy(); }

                // READ INTO BUFFER
                buffer.data[index] += data.toString();

            });

            req.on('end', function () {

                // READ INTO BUFFER
                buffer.client[index] = res;
                s.queue_add(index, buffer.done);
            });
        }

        req.setTimeout(timeout_external);
        req.on('timeout', function () {
            req.connection.destroy();
            clearInterval(timer);
        });

        req.on('error', function () {
            req.connection.destroy();
            clearInterval(timer);
        });

        // STREAMING
        res.on('data', function (data) {
            timer = performance.now();
        });

        // CLEAR BUFFER
        res.on('end', function () {
            buffer.data[index] = '';
            buffer.client[index] = null;
            s.queue_add(index, buffer.free);
            clearInterval(timer);
        });

    });

    // WRITE RESPONSES
    setInterval(function () {
        let buffer = null;
        let index = null;

        buffer = http_use_buffer(buffers, queues, 'response_write');
        if (buffer === false) { return; }
        index = s.queue_remove(buffer.done);
        if (index === false) { return; }

        // CHECK IF STREAMING
        if (buffer.stream[index] === 0) {
            buffer.client[index].end(buffer.data[index]);
            buffer.client[index] = null;
            return;
        }
        if (buffer.stream[index] === 1) { buffer.client[index].write(buffer.data[index]); return; }
    });

    server.listen(port);
}

function http_client(buffers, queues) {

}





function main(functions, buffers, queues) {

    // GET BUFFER AND INDEX
    let request = http_use_buffer(buffers, queues, 'request_read');
    let request_index = false;
    if (request !== false) { request_index = s.queue_remove(request.done); }

    let response = http_use_buffer(buffers, queues, 'request_read');
    let response_index = false;
    if (response !== false) { response_index = s.queue_remove(response.done); }

    if (request == false && response === false) { return; }
    if (request_index === false && response_index === false) { return; }

    // CHECK TIMEOUTS / CLEAR BUFFER


    // @TEST
    console.log(performance.now() - request.start[request_index]);

    // ITERATE OVER AND EXECUTE INTERVAL
    //

    // ITERATE OVER AND EXECUTE MESSAGE
    let len = functions.length;
    if (len === 0) { return; }
    let i = 0;
    while (i < len) {
        let execution = functions[i](request, response, request_index, response_index);
        if (execution === true) { return; }
        i += 1;
    }
}

let functions = [];
setInterval(main, 0, functions, buffers, queues);





// INPUT
process.stdin.on('data', function (data) {

    //let start = performance.now();

    let string = s.str_create(data.toString());

    if (p.str_static(string, 'print 0')) { console.log(buffers[0][0]); }

    if (p.str_static(string, 'send')) {

        let data = "this is a post";

        let options = {
            timeout: 500,
            method: 'GET',
            headers: {
                'Content-Length': data.length
            }
        };

        let temp = '';

        let req = http.request('http://localhost:8000', options, function (res) {

            res.on('data', function (data) {
                temp += data.toString();
                return;
            });

            res.on('end', function () {
                console.log(temp);
                return;
            });
        });

        req.on('error', function () {
            console.log('Connection timed out');
        });


        if (options.method === 'POST') {
            req.write(data);
        }

        req.end();

    }

    //let end = performance.now();
    //console.log(end - start);

    return;
});

http_server(false, 8000, 10000, 1000, buffers, queues);