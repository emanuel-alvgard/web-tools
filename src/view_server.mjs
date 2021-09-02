// INTERNAL DATA
let head_index = 0;
let body_index = 0;
let head = [];
let body = [];


// INTERNAL FUNCTIONS
function current_index(section) { 
    if (section === 'head') {
        head_index += 1; 
        return head_index - 1;
    }
    else if (section === 'body') {
        body_index += 1; 
        return body_index - 1;
    }
}



// MISC
function comment(section, text) {
    if (section === 'head') {
        head.push(['<!--', text, '-->']);
        return current_index('head');
    }
    else if (section === 'body') {
        body.push(['<!--', text, '-->']);
        return current_index('body');
    }
}

// HEAD
function meta() {}


// BODY
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
    return current_index('body');
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
    return current_index('body');
} 







 
function build() {
    
    let html = '<!DOCTYPE html><html>';
    let _head = '<head>';
    let _body = '<body>';
    let element = '';

    // @NOT
    // HEAD
    let i = 0;
    let len = head.length;
    while (i < len) {
        element += head[i][0];
        element += head[i][1];
        element += head[i][2];
        
        _head += element;
        element = '';
        i += 1;
    }

    // @NOT still needs solution for scripts
    // BODY
    i = 0;
    len = body.length;
    while (i < len) {

        if (body[i][0] === '<') {
            
            let has_attributes = 0;
            element += body[i][0];
            element += body[i][1];
            if (body[i][2] !== ' id="') { element += body[i][2]; has_attributes = 1; }
            if (body[i][3] !== ' class="') { element += body[i][3]; has_attributes = 1; }
            if (body[i][4] !== ' style="') { element += body[i][4]; has_attributes = 1; }
            if (has_attributes === 1) { element += body[i][5]; }
            element += body[i][6];
            element += body[i][7];
            if (i !== 0) {
                element += body[i][8];
                element += body[i][9];
                element += body[i][10]; 
            }
        }
        else {

            element += body[i][0];
            element += body[i][1];
            element += body[i][2];
        }


        _body += element;
        element = '';
        i += 1;
    } 

    _head += '</head>';
    _body += '</div></body>';
    html += _head + _body + '</html>';

    return html;
}









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

