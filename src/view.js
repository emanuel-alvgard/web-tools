let attributes = {
    id: ""
}

let index = 0;

let elements = [
    ["<div", new attributes, ">", "</div>"] // this is the pre existing root element (move into create function)
]


function create() {
    // add root element to elements
    return elements[0];
} // inits View and returns root

function current_index() { index += 1; return index - 1; }

// TAGS
function eDiv(content) {
    elements.push(["<div", new attributes, ">", content, "</div>"]);
    return current_index();
}
function eButton() {
    elements.push(['<button type="button"', new attributes, ">", content, "</button>"]);
    return current_index();
}
function eLink() {} // <a>


// ATTRIBUTES
function aId(index, value) {
    if (typeof value !== String) { value = toString(value); } 
    elements[index][1]["id"] = "id=" + value;
    return;
}

function aClass() {}


function build() {
    let html = "";

    return html;
}





export {
    
    // HTML
    create,
    build,
    html,
    
    // ELEMENTS
    eDiv,
    eButton,
    eLink,
    
    // ATTRIBUTES
    aId,
    aClass,
    
    // COMPONENTS
}

