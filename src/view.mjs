// INTERNAL DATA
let index = 0;
let head_elements = [];
let body_elements = [];

let attributes =  {
    id: '',
    class: ''
};



// INTERNAL FUNCTIONS
function current_index() { index += 1; return index - 1; }



// GLOBAL
function create() {
    let a = Object.create(attributes);
    body_elements.push(['<div', a, '>', '', '</div>']);
    return current_index();
} 

function build() {
    let html = '<!DOCTYPE html><html>';
    let head = '<head>';
    let body = '<body>';
    let element = '';

    // HEAD
    let i = 0;
    let len = head_elements.length;
    while (i < len) {
        // concatenation here
        element = '';
        i += 1;
    }

    // BODY
    i = 0;
    len = body_elements.length;
    while (i < len) {
        let e = body_elements[i];
        element += e[0];

        let a = Object.values(e[1]);
        for (let j = 0; j < a.length; j ++) {
            if (a[j] !== '') { element += ' ' + a[j]; }
        }
        
        element += e[2];
        element += e[3];
        if (i != 0) { element += e[4]; }

        body += element;
        element = '';
        i += 1;
    } 

    head += '</head>';
    body += '</div></body>';
    html += head + body + '</html>';

    return html;
}

// HEAD ELEMENTS
function meta() {}


// BODY ELEMENTS
function div(content) {
    let a = Object.create(attributes);
    body_elements.push(['<div', a, '>', content, '</div>']);
    return current_index();
}
function button(content) {
    let a = Object.create(attributes);
    body_elements.push(['<button type="button"', a, '>', content, '</button>']);
    return current_index();
}
function link(content) {}



// ATTRIBUTES
function set_id(index, value) {
    body_elements[index][1].id = 'id="' + value + '"';
    return;
}

function set_class(index, value) {
    body_elements[index][1].class = 'class="' + value + '"';
    return;
}


// COMPONENTS



export default {
    
    // HTML
    create,
    build,
    
    // body_ELEMENTS
    div,
    button,
    link,
    
    // ATTRIBUTES
    set_id,
    set_class,
    
    // COMPONENTS
}

