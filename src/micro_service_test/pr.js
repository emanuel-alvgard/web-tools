// page server
let parsing = require('../parsing.js');
let net = require('net');



// EXTERNAL ACTIONS (called by other)
function authenticate(cli, req) {
    
    if (!parsing.static_string(req, 'id')) { return; }
    if (!parsing.symbol(req, ':')) { return; }
    let checkpoint = req.pointer;
    if (!parsing.dynamic_string(req, '0', 10, '|:,')) { return; }

    cli.connected = 1;
    cli.id = req.string.substr(checkpoint, req.pointer);
    return;
}


function disconnect() {}




// INTERNAL ACTIONS (called by self)
function recieve(cli, req, res) {

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



function send(cli, data) {
    if (cli.connected === 1) {
        cli.socket.write('|id:' + cli.id + data);
        return;
    }

    cli.socket.write(data);
    return;

}


function connect(cli, req, res) {
    
    send(cli, '|action:authenticate,key:' + con.key);

    cli.socket.on('data', function(data) {
       req.string = data.toString(); 
       recieve(cli, req, res);
    });
}



function start(address, port) {

    let client = {
        socket: 0,
        key: '###',
        connected: 0,
        id: ''
    };
    
    // make all 3 into 1 object??
    let request = {
        s: '',
        p: 0,
    
        get string() { return this.s; },
        set string(x) { this.s = x; },
    
        get pointer() { return this.p; },
        set pointer(x) { this.p = x; }    
    };
    
    let response = {
        string: ''
    };


    let options = { address: address, port: port };

    client.socket = net.createConnection(options, function() {
        connect(client, request, response);
    });

    let result = {
        client: client,
        request: request,
        response: response
    };

    return result;
}


router = start('127.0.0.1', 3000);

send(router.client, '|action:log,data:hello from client!');


// SPECIFIC FUNCTIONALITY WITH SENDS.
