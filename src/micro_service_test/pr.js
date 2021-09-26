// page server
let parsing = require('../parsing.js');
let net = require('net');


// EXTERNAL ACTIONS (called by other)
function authenticate(client) {
    
    if (!parsing.static_string(client, 'id')) { return; }
    if (!parsing.symbol(client, ':')) { return; }
    let checkpoint = client.pointer;
    if (!parsing.dynamic_string(client, '0', 10, '|:,')) { return; }

    client.connected = 1;
    client.id = client.string.substr(checkpoint, client.pointer);
    return;
}


function disconnect() {}




// INTERNAL ACTIONS (called by self)
function router(cli, req, res) {

    req.pointer = 0;

    if (cli.connected === 1) {

        let len = req.string.length;
        while (req.pointer < len) {
            if (!parsing.symbol(req, '|')) { return; }
            if (!parsing.static_string(req, 'action')) { return; }
            if (!parsing.symbol(req, ':')) { return; }

            // ACTIONS
            if (parsing.static_string(req, 'disconnect')) { /* execute disconnect(); */}
        }
        return;
    }

    if (!parsing.symbol(req, '|')) { return; }
    if (!parsing.static_string(req, 'action')) { return; }
    if (!parsing.symbol(req, ':')) { return; }
    if (!parsing.static_string(req, 'authenticate')) { return; }

    authenticate(cli, req);
    return;
}



function message(cli, data) {
    if (cli.connected === 1) {
        cli.socket.write('|id:' + cli.id + data);
        return;
    }

    cli.socket.write(data);
    return;

}


function connect(cli, req, res) {
    
    message(cli, '|action:authenticate,key:' + con.key);

    cli.socket.on('data', function(data) {
       req.string = data.toString(); 
       router(cli, req, res);
    });
}



function start(address, port) {

    let client = {
        
        // GENERAL
        _socket: 0,
        _connected: 0,
        _key: '###',
        _id: '',

        get socket() { return this._socket; },
        get connected() { return this._connected; },
        get key() { return this._key; },
        get id() { return this._id; },

        set socket(value) { this._socket = value; },
        set connected(value) { this._connected = value; },
        set key(value) { this._key = value; },
        set id(value) { this._id = value; },
        
        // REQUEST
        _string: '',
        _pointer: 0,
    
        get string() { return this._string; },
        get pointer() { return this._pointer; },

        set pointer(value) { this._pointer = value; },   
        set string(value) { this._string = value; },

        // ACTION
        actions = [],

        get actions() { return this.actions; },
        set actions(value) { this.actions = value; }
    }
  

    // CREATE SOCKET
    let options = { address: address, port: port };

    client.socket = net.createConnection(options, function() {
        connect(client, request, response);
    });

    return client;
}


function stop() {}


router = start('127.0.0.1', 3000);

function archive() {}

action_add(router, 'archive', archive);
action_remove(router, 'archive');

send(router, '|action:log,data:hello from client!');


// SPECIFIC FUNCTIONALITY WITH SENDS.
