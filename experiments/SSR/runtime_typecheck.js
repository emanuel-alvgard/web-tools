// REFERENCE
let ref = {
    name: { type: "string", options: {min: 3, max: 20, opt: true}}, // type, min, max, optional
    age: { type: "integer", options: {min: 0, max: 100, opt: true}} // type, min, max, optional
}


function string() {}
function integer() {}
function float() {}

function schema() {}

let user = schema({
    name: string({min: 3, max: 20, opt: true}),
    age: integer({min: 0, max: 100, opt: true})
}, true);


let test = {
    name: "Emanuel",
    age: 30 
}

parse(test, user);

