// page server
let parsing = require('../parsing.js');
let net = require('net');

let connection_data = {
    connected: 0,
    id: ''
}

let request_data = {
    s: '',
    p: 0,

    get string() { return this.s; },
    set string(x) { this.s = x; },

    get pointer() { return this.p; },
    set pointer(x) { this.p = x; }    
}

let response_data = {
    string: ''
}






// EXTERNAL ACTIONS (called by other)
function authenticate(con, req) {
    
    if (!parsing.static_string(req, 'id')) { return; }
    if (!parsing.symbol(req, ':')) { return; }
    let checkpoint = req.pointer;
    if (!parsing.dynamic_string(req, '0', 10, '|:,')) { return; }

    con.connected = 1;
    con.id = req.string.substr(checkpoint, req.pointer);
    return;
}


function disconnect() {}




// INTERNAL ACTIONS (called by self)
function recieve(con, req, res) {

    req.pointer = 0;

    if (con.connected === 1) {

        let len = req.string.length;
        while (req.pointer < len) {
            if (!parsing.static_string(req, 'action')) { return; }
            if (!parsing.symbol(req, ':')) { return; }

            if (parsing.static_string(req, 'disconnect')) { /* execute disconnect(); */}
        }
        return;
    }

    if (!parsing.static_string(req, 'action')) { return; }
    if (!parsing.symbol(req, ':')) { return; }
    if (!parsing.static_string(req, 'authenticate')) { return; }

    authenticate(con, req);
    return;
}

function send() {}


function connect(cli, con, req, res) {
    
    // client.write('action:authenticate,key:###');

    cli.on('data', function(data) {
       req.string = data.toString(); 
       recieve(con, req, res);
    });
}





let options = { port: 3000 };

let client = net.createConnection(options, function() {
    connect(client, connection_data, request_data, response_data);
});


