// SOA
let built = [0, 0, 0];
let parent = [0, 0, 1];

// AOS
let elements = [
    ["div", "id=0", ""], // this is the pre existing root element
    ["div", "id=1", "Hello!"],
    ["div", "id=2", "World!"],
    ["div", "id=3", "World!"],
]

let html = "";


function create() {} // inits View and returns root

function add(string, attributes, content, ) {
    let tag = []
    tag.push();
}

function remove() {}

function recursive() {
    
    return recursive();
}

function build() {

    for (let i = 0; i < elements.length; i ++) {
        for (let j = 0; j < parent.length; j ++) {
            if (built[j] === 1) { continue; }
            if (parent[j] != i) { continue; }

        }
    }
}


export {
    create,
    add,
    remove,
    build,
    html
}