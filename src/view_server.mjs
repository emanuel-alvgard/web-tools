// INTERNAL DATA
let index = 0;
let head = [];
let body = [];


// INTERNAL FUNCTIONS
function current_index() { index += 1; return index - 1; }



// GLOBAL
function create() {
    body.push(
        [
            '<', 
            'div', 
            ' id="', 
            ' class="', 
            ' style="',
            '"',  
            '>', 
            '', 
            '</', 
            'div', 
            '>'
        ]
    );
    return current_index();
} 


 // @REDO
function build() {
    let html = '<!DOCTYPE html><html>';
    let head = '<head>';
    let body = '<body>';
    let element = '';

    // HEAD
    let i = 0;
    let len = head.length;
    while (i < len) {
        // concatenation here
        element = '';
        i += 1;
    }

    // BODY
    i = 0;
    len = body.length;
    while (i < len) {
        let e = body[i];
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

// MISC
function comment(text) {

}

// HEAD body
function meta() {}


// BODY body
function element(type, content) {
    body.push(
        [
            '<',
            type, 
            ' id="', 
            ' class="', 
            ' style="',
            '"', 
            '>', 
            content, 
            '</', 
            type, 
            '>'
        ]
    );
    return current_index();
}


// ATTRIBUTES
function set_id(index, value) {
    body[index][2] += value + '"';
    return;
}

function set_class(index, value) {
    body[index][3] += value + '"';
    return;
}

function set_style(style, index, value) {
    
    let space = " ";
    if (body[index][4] === ' style="') { space = ''; } 
    body[index][4] += space + style + ':' + value + ';';

    return;
}



// SCRIPTS
function script_inline(script) {}
function script_module(path) {}
function script_file(path) {}


// COMPONENTS












export default {
    
    // HTML
    create,
    build,

    // MISC
    comment,
    
    // body
    element,
    
    // ATTRIBUTES
    set_id,
    set_class,
    set_style,

    // SCRIPTS
    script_inline,
    script_module,
    script_file

    // COMPONENTS
}

