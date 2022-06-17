// REFERENCE
let ref = {
    name: { type: "string", options: {min: 3, max: 20, opt: true}}, // type, min, max, optional
    age: { type: "integer", options: {min: 0, max: 100, opt: true}} // type, min, max, optional
}


function string() {}
function integer() {}
function float() {}

function type() {}
function check() {}

let user = type(
    {
        name: string({min: 3, max: 20, opt: true}),
        age: integer({min: 0, max: 100, opt: true})
    }, 
    {
        strict: true
    }
);


let test = {
    name: "Emanuel",
    age: 30 
}

resutl = check(test, user);

