'use strict';


// @DONE
function sync_sleep(ms) {

    let start = performance.now();
    let end = 0;
    while ((end - start) < ms) { end = performance.now(); }
    return;
}








// @API
// http_server_create
// http_server_delete
// http_server_connect
// http_server_disconnect

// http_write_request
// http_write_response
// http_read_request
// http_read_response

// buffer contains 3 arrays (index_queue, clients, data). This is mainly for threaded access

let struct = require('./structure_lib.js');
let http = require('http');
let https = require('https');





function http_read_response(data, res_data, origin, client) {
    
}



// HTTP works, now https needs fixing
// @NOT
async function http_write_request(tls, method, content, path, port, timeout, data) {

    //if (result.state === 1) { return; }

    let options = {
        timeout: timeout,
        method: method,
    };

    let protocol;
    let protocol_string = '';

    if (tls) {
        protocol = https;
        protocol_string = 'https://';
    }
    else {
        protocol = http;
        protocol_string = 'http://';
    }

    let url = protocol_string + path + ':' + port;

    if (method === 'GET') {
        if (content.length > 0) {
            if (content[0] !== '/') {
                content = '/' + content;
            }
        }
        url += content;
    }

    // also add https
    let req = protocol.request(url, options, function (res) {

        res.on('data', function (data) {
            response_data += data.toString();
            return;
        });

        res.on('end', function () {
            return;
        });
    });

    req.on('timeout', function () {
        //result.state = 3;
        req.destroy();
        return;
    });

    req.on('error', (error) => {
        return;
    });

    //result.state = 1;
    if (method === 'POST') { req.write(content); }
    req.end();
}







// @TEST 

let data = {
    
};

http_write_request(false, 'GET', '/', 'www.google.com', 80, 500, data);











/* @NOT
async function http_write_response(data) {


    // this function is responsible for sending repsones and adding
    // avalible req_indices to req_queues
    cllient.setHeader('Access-Control-Allow-Origin', '*');
    client.writeHead(status);
    client.end(content);

    return;
}

// @NOT
// @ADD request queueing
// @ADD queue for hostname
function http_server_create(data) {

    return http.createServer(async function (request, client) {

        if (request.method === 'GET') {
            console.log(request.headers.host);
            console.log(request.url);
            return;

        }
        if (request.method === 'POST') {

            let request_data = '';

            request.on('data', function (data) {
                request_data += data.toString();
            });

            request.on('end', function () {
                console.log(request.headers.host);
                console.log(request_data);
                return;
            });
        }
    });
}



// @DONE
async function http_server_connect(server, port) {
    server.listen(port);
    return;
}




// @HERE
// @NOT
function http_read_request(data, req_data, origin, client) {

    // CHECK BUFFER
    let buffer_index = 0;
    let buffer_array = data.request;
    let buffer_count = data.request.length;
    let req_len = req_data.length;

    while (true) {
        if (buffer_index >= buffer_count) { return false; }
        if (req_len <= buffer_array[buffer_index].size) { break; }
        buffer_index += 1;
    }

    // GET REQUEST INDEX
    let buffer = data.request[buffer_index];
    if (buffer.req_queue.count === 0) { return false; }
    let req_index = struct.queue_remove(buffer.req_queue);

    // STORE REQUEST AND CLIENT 
    buffer.req_data[req_index] = req_data;
    buffer.client[req_index] = client;

    // STORE ORIGIN
    if (buffer.proxy === 0) {
        buffer.origin[req_index] = origin;
        buffer.proxy = 1;
    }

    return true;
}








*/



/*
let server = http_server_create(data);
http_server_connect(server, 8000);

let result = http_result();
http_request('GET', 'localhost', 8000, '/Hello World', 500, data);
*/


///* @TEST



let data = {

    config: {
        global: {
            memory: 0,
            requests: 10000,
            threads: [],
            logging: 0
        }
    },

    http: {
        read: {
            request: {
                size: 0, // add req string size to see prevent hitting application config.global.memory limit
                queue: struct.queue_create(config.global.requests), // this is a queue structure
                state: new Array(config.global.requests),
                proxy: new Array(config.global.requests),
                origin: new Array(config.global.requests),
                client: new Array(config.global.requests),
                body: new Array(config.global.requests), // server creates str from data
                head: new Array(config.global.requests),
            },


            response: {
                size: 0,
                queue: struct.queue_create(10),
                state: new Array(config.global.requests)
            }
        },


        write: {
            request: {
                queue: struct.queue_create(10),
                state: new Array(config.global.requests)
            },
            response: {
            
            }
        }
    },
        

    cache: {
        certificate: {
            origin: [],
            data: []
        },

        public: {
            path: ['/public/hello.txt', '/public/world.html'],
            data: ['Hello Everyone!', '<html>Hello World!</html>']
        }
    }
}



/*
let i = 0;
let len = data.request[0].req_queue.data.length;
while (i < len) {
    struct.queue_add(i, data.request[0].req_queue);
    struct.queue_add(i, data.request[1].req_queue);
    i += 1;
}

data.request[0].proxy[0] = 1;
data.request[1].proxy[0] = 1;

console.log(http_read_request(data, '/hello', 'example.com', null));
console.log(http_read_request(data, '/hello', 'example.com', null));
console.log(http_read_request(data, '/hello', 'example.com', null));
console.log(http_read_request(data, '/hello', 'example.com', null));
console.log(http_read_request(data, '/hello', 'example.com', null));
console.log(http_read_request(data, '/hello', 'example.com', null));
console.log(http_read_request(data, '/hello', 'example.com', null));
console.log(http_read_request(data, '/hello', 'example.com', null));
console.log(http_read_request(data, '/hello', 'example.com', null));
console.log(http_read_request(data, '/hello', 'example.com', null));
console.log(http_read_request(data, '/hello', 'example.com', null));
console.log(http_read_request(data, '/hello', 'example.com', null));

console.log(http_read_request(data, '/this is about 20', 'other.com', null));
console.log(http_read_request(data, '/this is probably more than 20', 'last.com', null));

console.log(data.request[0]);
console.log(data.request[1]);



*/