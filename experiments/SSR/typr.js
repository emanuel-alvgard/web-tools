/* REFERENCE
let schema_1 = {
    type: "object",
    schema: {
        name: { type: "string", schema: {}, options: {optional: false, parser: function() {}}}, // type, min, max, optional
        age: { type: "integer", schema: {}, options: {min: 0, max: 100, opt: true}} // type, min, max, optional
    },
    options: {}
};


// DEFAULT OPTIONS (looks different for each type)
// min, max, optional, parser, nullable



let schema_2 = {
    type: "array",
    schema: { 
        type: "array", schema: {}, options: {} 
    },
    options: {}
}

function _type(t,s,o) {
    // ceates the type with the basic options
}

function _string() { 
    _type(); 
    // adds it's own options on top of the basic ones
    // min, max, length
}
function _number(s,o) {}
function _boolean(s,o) {}

function _integer(s,o) {}
function _float(s,o) {}

function _undefined(s,o) {}
function _null(s,o) {}
function _any(s,o) {}

function _object(s,o) {}
function _array(s,o) {}

function _type(s,o) {}
function _check(s,o) {}

exports.type = _type;
exports.check = _check;
exports.null = _null;

let hej = { string() { return this; }};



let array_ref = array(string());
let object_ref = object({
        children: array(string()),
        name: string()
    });

let test = [{a: ""}, {a: ""}, { a: ""}]

*/


// make async check function?


function _min(p,i,v,e) { // pointer, index, value, error
    return p;
}

function _max(p,i,v,e) { // pointer, index, value, error
    return p;
}

// STRING
let string_ = {

    schema: {
        t: "string", // type
        s: {}, // schema
        o: {}, // options
    },

    min(v,e="") { return _min(this,0,v,e); },
    max(v,e="") { return _max(this,1,v,e); }
}


function _string() { return string_; }

function _cs() {} // check string


// CHECK
function _c() {}



// EXPORTS
exports.string = _string;