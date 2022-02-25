const struct = require('./structure_lib.js');
const parse = require('./parse_lib.js');

// @ADD parameter for global state buffer
// @ADD ability to stream multiple larger files over multiple iterations
function main(data, queue_index, req_index) {

    if (data.config.public.enabled === 0) { console.log('not enabled.'); return false; }

    // CONFIG
    let public_origin = data.config.public.origin;
    let public_path = data.config.public.path;
    let public_default = data.config.public.default;
    let public_extensions = data.config.public.extensions;

    // CACHE
    let cache_origin = data.cache.public.origin;
    let cache_path = data.cache.public.path;

    // CHECK ORIGIN
    let origin = data.request[queue_index].origin[req_index];
    let public_index = public_origin.indexOf(origin);
    if (public_index === -1) { console.log('invalid origin.'); return false; }

    // REQUEST
    let req_data = data.request[queue_index].req_data[req_index];

    // DEFAULT PATH
    if (req_data.string === '/') { struct.str_set(req_data, public_path[public_index] + public_default[public_index]); }

    // CHECK PATH
    if (parse.str_static(req_data, public_path[public_index]) === false) { console.log('invalid directory.'); return false; }
    req_data.pointer = 0;

    // CHECK EXTENSION
    let max_index = (req_data.length - 1);
    let i = max_index;

    while (i !== 0) {
        if (req_data.string[i] === '.') { break; }
        i -= 1;
    }

    let extension = max_index - i;
    if (public_extensions[public_index].includes(req_data.string.slice(-extension)) === false) { console.log('invalid extension.'); return false; }

    // CHECK CACHE
    let origin_index = cache_origin.indexOf(origin);
    if (origin_index === -1) { return false; }

    let path_index = cache_path[origin_index].indexOf(req_data.string);
    if (path_index !== -1) {
        data.request[queue_index].res_data[req_index] = data.cache.public.data[origin_index][path_index];
        return true;
    }

    return false;
}

/* @TEST

let data = {

    config: {
        public: {
            enabled: 1,
            origin: ['example.com'],
            path: ['/public/'],
            default: ['index.html'],
            extensions: [['txt', 'jpg', 'html']]
        }
    },

    request: [
        { // 10B
            size: 10,
            req_queue: struct.queue_create(10), // this is a queue structure
            res_queue: struct.queue_create(10),
            proxy: [1],
            origin: ['example.com'],
            client: [],
            req_data: [struct.str_create('/public/hey.txt')], // server creates str from data
            req_head: [],
            res_data: [''],
            res_head: []
        }
    ],

    cache: {
        public: {
            origin: ['example.com'],
            path: [
                ['/public/hello.txt', '/public/world.html']
            ],
            data: [
                ['Hello Everyone!', '<html>Hello World!</html>']
            ]
        }
    }
}

data.request[0].req_data[0] = struct.str_create('/public/world.html');

let start = performance.now();
main(data, 0, 0);
let end = performance.now();
console.log(end - start);

console.log(data.request[0].res_data[0]);
*/