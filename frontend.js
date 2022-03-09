// 0 = div
// 1 = h1





let current = 0;

let current_scope = 0;
let close_stack = [];

let result = [];




function element(tag, attributes, content, scope) {

    if (scope <= current_scope && current !== 0) {
        let i = scope;
        while (i <= current_scope) {
            result.push(close_stack[current - 1]);
            close_stack.pop();
            current -= 1;
            i += 1;
        }
    }
    if (attributes === null) { result.push("<" + tag + ">");}
    else { result.push("<" + tag + " " + attributes + ">"); }
    result.push(content);
    close_stack.push("</" + tag + ">");
    current_scope = scope;
    current += 1;
}


function div(attributes, content, scope) { element("div", attributes, content, scope); }
function a(attributes, content, scope) { element("a", attributes, content, scope); }


function build() {

    let i = close_stack.length - 1;
    while (true) {
        result.push(close_stack[i]);
        close_stack.pop();
        if (i === 0) { break; }
        i -= 1;
    }
    return result.join("");
}



let start = performance.now();

div('id="test"', "", 0);
a('href="https://test.com"', "this is a link", 1);
for (let i = 0; i < 100; i++) {
    div(null, "yooo", 1);
}

let html = build();
console.log(performance.now() - start);
console.log(html);
