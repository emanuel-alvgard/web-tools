let struct = require('./structure_lib.js');
let http = require('http');
let https = require('https');





// @NOT
function http_read_response(data, req_data, origin, client) {

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



// HTTP works, now https needs fixing
// @NOT
async function http_write_request(tls, method, content, path, port, timeout, data) {


    // SETUP
    let memory = data.config.global.memory;
    let write = data.http.write.request;
    let read = data.http.read.response;
    let index = null;

    if (write.state === 1) { return; }

    let options = {
        timeout: timeout,
        method: method,
    };

    // SET HTTP PROTOCOL
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

    // FORMAT URL
    let url = protocol_string + path + ':' + port;

    if (method === 'GET') {
        if (content.length > 0) {
            if (content[0] !== '/') {
                content = '/' + content;
            }
        }
        url += content;
    }

    // WRITE REQUEST
    let req = protocol.request(url, options, function (res) {

        res.on('data', function (incoming_data) {
            if (data.memory + incoming_data.toString().length > memory) { /* set status code to 500? */ };
            // if index === null 
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

    memory: 0,

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
                queue: struct.queue_create(config.global.requests), // this is a queue structure
                state: new Array(config.global.requests),
                proxy: new Array(config.global.requests),
                origin: new Array(config.global.requests),
                client: new Array(config.global.requests),
                body: new Array(config.global.requests), // server creates str from data
                head: new Array(config.global.requests),
            },


            response: {
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





http_write_request(false, 'GET', '/', 'www.google.com', 80, 500, data);
