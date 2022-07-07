// The JSON api is visible in realtime while creating fields.
// The view for editing data is the same as editing the data model (depending on user).
// a field can contain a function.
// a field is equivalent to a programming variable.
// a field can contain 1 of the following: field / primitive
// primitives includes: string, number, file, image etc.
// each field has a unique id which can be referenced in other fields.


const http_builtin = require("http");
const fs_builtin = require("fs");

let db;
try { 
    db = JSON.parse(fs_builtin.readFileSync("./cms.json")); 
} 
catch(e) {}



function generate_id() {
    
    let result = "";
    for (let i = 0; i < 8; i++) {
        
        let type = Math.floor(Math.random() * 3);
        switch (type) {
            case 0: result += String.fromCharCode(Math.floor(Math.random() * (10)) + 48); break;
            case 1: result += String.fromCharCode(Math.floor(Math.random() * (25)) + 65); break;
            case 2: result += String.fromCharCode(Math.floor(Math.random() * (25)) + 97); break;
        }
    }
    return result;
}

function create_field() {
    let s = performance.now();
    let id;
    while(1) {
        id = generate_id();
        if (db.id.includes(id) === false) {
            db.id.push(id);
            fs_builtin.writeFileSync("./cms.json", JSON.stringify(db));
            break;
        }
    }
    console.log(performance.now() - s);
    return id;
}

let server = http_builtin.createServer(function (req, res) {
    let result = "";
    let data = "";

    req.setEncoding("utf8");
    req.on("data", function (d) { data += d.toString(); });
    req.on("end", function () { 
        if (req.url === "/create") { result = create_field(); }
        if (req.url === "/save") { }
        if (req.url === "/clear") { db.id = []; fs_builtin.writeFileSync("./cms.json", JSON.stringify(db)); console.log(db); }
        res.end(result); 
    });
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*"
    });
});

server.listen(3000);

