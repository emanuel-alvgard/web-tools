let t = require("./runtime_typecheck");


function protocol_parse(string) {

    // parsing string here

}

let user = t.object(
    {
        name: t.string().parser(protocol_parse).optional(),
        age: x.number().int().min(0).max(100)
    }, 
).nullable();


let test = {
    name: "Emanuel",
    age: 30 
}

result = t.check(test, user);
console.log(result);