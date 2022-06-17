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

function min(p,n,e) {
    console.log(n);
    return p;
}

function max(p,n,e) {
    console.log(n);
    return p;
}

let s_ = {
    min(n,e="") { return min(this,n,e); },
    max(n,e="") { return max(this,n,e); }
}

function _s() { return s_; }

let str = _s;

str().min(0).max(10);
