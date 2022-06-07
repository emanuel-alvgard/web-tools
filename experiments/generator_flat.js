// Write this library in C?
// generates HTML and JS/CSS runtime

let current = 0;

let current_scope = 0;
let close_stack = [];

let result = ['<!DOCTYPE><html><head></head><body style="opacity:0">'];

let buffer = [];


function element(buffer, tag, attributes, content) {

    if (scope <= current_scope && current !== 0) {
        let i = scope;
        while (i <= current_scope) {
            buffer.push(close_stack[current - 1]);
            close_stack.pop();
            current -= 1;
            i += 1;
        }
    }
    if (attributes === null) { buffer.push("<" + tag + ">");}
    else { buffer.push("<" + tag + " " + attributes + ">"); }
    buffer.push(content);
    close_stack.push("</" + tag + ">");
    current_scope = scope;
    current += 1;
}


function div(buffer, attributes, content, scope) { element(buffer, "div", attributes, content, scope); }
function a(buffer, attributes, content, scope) { element(buffer, "a", attributes, content, scope); }


function build() {

    let i = close_stack.length - 1;
    while (true) {
        result.push(close_stack[i]);
        close_stack.pop();
        if (i === 0) { break; }
        i -= 1;
    }
    result.push("</body></html>");
    return result.join("");
}



let start = performance.now();

div("", "this is a div!");
let test = a('href="https://test.com"', "this is a link");
animation(TRIGGER, test, x0, 100, 200, 500, 0, curve_quad, END_SIGNAL);


let html = build();
console.log(performance.now() - start);
console.log(html);
