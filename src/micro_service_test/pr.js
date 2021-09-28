/* PROTOCOL 
|action:view,url:/static
|action:route,url:/static/*{id}[100]

|message:execute,id:02,action:route,data:
    |action:view,url:/static

    
|message:authenticate,key:###somekey
*/



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

function execute() {}

function disconnect() {}




// INTERNAL ACTIONS (called by self)
function route(cli, req, res) {

    req.pointer = 0;

    if (cli.connected === 1) {

        let len = req.string.length;
        while (req.pointer < len) {
            if (!parsing.symbol(req, '|')) { return; }
            if (!parsing.static_string(req, 'message')) { return; }
            if (!parsing.symbol(req, ':')) { return; }

            // ACTIONS
            if (parsing.static_string(req, 'disconnect')) { /* call disconnect(); */}
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



function message(client, action, data) {

    if (client.connected === 1) {
        client.socket.write('|message:'+ action + ',id:' + client.id + data);
        return;
    }
}


function connect(client) {
    
    message(client, '|action:authenticate,key:' + con.key);

    client.socket.on('data', function(data) {
       client.string = data.toString(); 
       route(client);
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
        _actions = [],
        _action_functions = [],

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





/*

let test = Client.allocate();

Client.procedure(test, 'get', function(data) { _get(data); )});
Client.procedure(test, 'set', function(data) { _set(data); )});

Client.start(test, '127.0.0.1', 3000, #429asdVDds#);
Client.log(test);

Client.message(test, 'disconnect');

Client.stop(test);

Client.free();
*/

