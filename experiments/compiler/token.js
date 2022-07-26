const util = require("./util.js");

let symbol_s = [
    " ",
    "\n",
    "\r\n",
    ".",
    ":",
    "=",
    "<",
    ">",
    "!=",
    "!<",
    "!>",
    "&",
    "|"
];

let symbol_t = [
    "spc",
    "newl",
    "newl",
    ".",
    ":"
];

let keyword_s = [
    "str",
    "i8",
    "i16", 
    "i32",
    "i64"
];

let keyword_t = [
    "type", 
    "type"
];

let value_f = [
    util.value_label,
    util.value_i,
    util.value_f,
    util.value_str_fmt
];

let value_t = [
    "label", 
    "integer", 
    "float",
    "string_fmt"
];


// RESULT
let result_v = [];
let result_t = [];

// check all keywords and types first

let test = 'i32 test_int: 100\nstr test_string: "hello {test_int}" (';
// type / spc / label / : / spc / integer / newl/ type / spc / label / : / spc / string_fmt

// @DONE
function symbol(s, p) {
    
    for (let i=0; i < symbol_s.length; i++) {
        if (util.string(s, symbol_s[i], p)) { result_t.push(symbol_t[i]); return true; }
    }
    
    return false;
}

// @DONE
function keyword(s, p) {
    for (let i=0; i < keyword_s.length; i++) {
        if (util.string(s, keyword_s[i], p)) { result_t.push(keyword_t[i]); return true; }
    }
    
    return false;
}

// @DONE
function value(s, p) {
    for (let i=0; i < value_f.length; i++) {
        let value = value_f[i](s, p);
        if (value !== "") {
            result_v.push(value); 
            result_t.push(value_t[i]);      
            return true; }
    }
    
    return false;
}

let p = { position: 0, previous: 0 }
while (p.position < test.length) {

    if (symbol(test, p)) { continue; }
    if (keyword(test, p)) { continue; }
    if (value(test, p)) { continue; }

    console.log("unkown token: " + test[p.position]);
    break;
}

console.log(result_v);
console.log(result_t);
