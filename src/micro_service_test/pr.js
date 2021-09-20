// page server

let net = require('net');
const { receiveMessageOnPort } = require('worker_threads');

let id;
let connected = 0;


function recieve(data) {
    console.log('this is the second recieve: ' + data.toString());
}

function send(data) {}



function parse_id(string) {
    
    let result = '';
    let i = 1; 
    while (1) {
        if (string[i] === '/') { break; }
        else { result += string[i]; i += 1; }
    }
    return parseInt(result);
}



function recieve_id(data) {
    
    let string = data.toString();
    if (result[0] !== '/') { process.exit(); }
    else {
        connected = 1; 
        id = parse_id(string);
        console.log(id); 
        client.on('data', function(data) {
            recieve(data);
        });
    }
}



function connect(client) {
    
    client.write('authenticate/test_key');

    client.on('data', function(data) {
       recieve_id(data);
    });
}





let options = { port: 3000 };

let client = net.createConnection(options, function() {
    connect(client);
});


