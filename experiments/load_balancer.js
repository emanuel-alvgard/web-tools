var http = require('http');

const hostname = '127.0.0.1';
const port = 8000;

function handler(request, response) {
    
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end('<h1>Hello World!</h1>');
    return;
}


let http_server = http.createServer(handler);

http_server.listen(port, hostname);


// pass URL without headers to the chosen page router


let auth_key = 'test_key';
let net = require('net');

let index = 0;
let clients = [];
let status = [];

function action_authenticate(string, client) {
    
    if (string === auth_key) { 
        client.setTimeout(0);
        status.push(1);
        clients.push(client);
        client.write(index.toString());
        console.log('Client ' + index + ' connected');
        index += 1;
    }
    else {
        console.log('INVALID KEY'); 
        return; 
    }
}


function action_disconnect(string, client) {}


function recieve(data, client) {

    let string = data.toString();
    let sub_strings = string.split('/');

    let len = sub_strings.length;
    let i = 0;
    while (i < len) {
        if (sub_strings[i] === 'authenticate') { 
            action_authenticate(sub_strings[i + 1], client); 
            i += 2; 
            continue; 
        }
        if (sub_strings[i] === 'disconnect') { 
            action_disconnect(sub_strings[i + 1], client); 
            i += 2; 
            continue; 
        }
    }
}


function validate_connection(client) {
    
    client.setTimeout(10);

    client.on('data', function(data) {
        recieve(data, client);
    })

    client.on('timeout', function() {
        client.end();
    })
}


let internal_server = net.createServer(function(client) {
    validate_connection(client);
});


internal_server.listen(3000);

// make it so that routers can be added dynamically