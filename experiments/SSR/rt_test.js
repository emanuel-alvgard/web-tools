let type_checker = require("./runtime_typecheck");

const _type = type_checker.type;
const _check = type_checker.check;

function protocol_parse(string) {

    // parsing string here

}

let user = _type(
    {
        name: x.string({parse: protocol_parse, min: 3, max: 20, opt: true}),
        age: x.integer({min: 0, max: 100, opt: true})
    }, 
    {
        strict: true
    }
);


let test = {
    name: "Emanuel",
    age: 30 
}

result = _check(test, user);
console.log(result);