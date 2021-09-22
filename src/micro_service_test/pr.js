// page server
let parsing = require('../parsing.js');
let net = require('net');

let connection_data = {
    connected: 0,
    id: 0
}

let request_data = {
    s: '',
    get string() { return this.s; },
    p: 0,
    get pointer() { return this.p; },
    set pointer(x) { this.p = x; }    
}

let response_data = {
    string: ''
}






// EXTERNAL ACTIONS (called by other)
function authenticate(conn, req) {
    
    if (!parsing.static_string(req, 'id')) { return; }
    if (!parsing.symbol(req, ':')) { return; }
    let checkpoint = req.pointer;
    if (!parsing.dynamic_string(req, '0', 10, '|:,')) { return; }
    req.pointer -= checkpoint;

    conn.connected = 1;
    conn.id = parsing.integer(req);
    return;
}






// INTERNAL ACTIONS (called by self)
function recieve(inc, conn, req, res) {
    data_object.string = data.toString();

    if (connected === 1) {
        let len = data_object.string.length;
        let i = 0;
        while (i < len) {
            // check for actions and execute
        }
        data_object.pointer = 0;
        return;
    }
    if (parsing.static_string(data_object, 'authenticate')) {
        authenticate(data_object);
        data_object.pointer = 0;
        return;
    }
}

function send() {}


function connect(client) {
    
    client.write('action:authenticate,key:###');

    client.on('data', function(data) {
       recieve(data);
    });
}





let options = { port: 3000 };

let client = net.createConnection(options, function() {
    connect(client);
});


