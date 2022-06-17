// REFERENCE
let ref = {
    type: "object",
    schema: {
        name: { type: "string", options: {min: 3, max: 20, opt: true}}, // type, min, max, optional
        age: { type: "integer", options: {min: 0, max: 100, opt: true}} // type, min, max, optional
    }
}

function _property() {}

function _string() { _property(); }
function _number() {}
function _integer() {}
function _float() {}

function _null() {}

function _type() {}
function _check() {}

exports.type = _type;
exports.check = _check;
exports.null = _null;