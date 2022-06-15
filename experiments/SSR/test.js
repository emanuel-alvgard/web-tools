/*
let fs = require("fs");



//utils
// CHARACTER TYPES

// @DONE
function chr_digit(chr) {
    let c = chr.charCodeAt(0);
    if (c < 48) { return false; }
    if (c > 57) { return false; }
    return true;
}

// @DONE
function chr_lower(chr) {
    let c = chr.charCodeAt(0);
    if (c < 97) { return false; }
    if (c > 122) { return false; }
    return true;
}

// @DONE
function chr_upper(chr) {
    let c = chr.charCodeAt(0);
    if (c < 65) { return false; }
    if (c > 90) { return false; }
    return true;
}

//
function chr_symbol(chr, symbols) { // chr_symbol(chr, ["&", ":", "/"]);

}


// @ADD returning of pointer or something
function str(subject, pointer, target) {
    
    let target_len = target.length;
    let p = str.pointer;
    let l = str.length;
    let s = str.string;

    let i = 0;
    while (i < target_len) {
        if ((p + i) >= l) { return false; }
        if (s[p + i] !== target[i]) { return false; }
        i += 1;
    }

    // @ADD
    if (exact === true) {
        if (l > i) { return false; }
    }


    str.pointer += i;
    return true;
}


function substring() {}


function filetype() {}




// API INTERNALS
let _errors = {
    error_1: "exmple error 1",
    error_2: "example error 2"
};

async function render(func, request) {
    
    let _pages = [];
    let _page_index = 0;

    function element(b, t,p,a,c) {
        
        // give this element a unique index and add that index to the parents "children" array.
        
        return {
            root: 0,
            children: [],
            type: t,
            attributes: a,
            content: c,
        }
    }


    function style(b, p, path) {} // if style is not present in b_ss -> load the file instead.
    function div(b, p, a, c) { element(b, "div", p, a, c); }
    function button(b, p, a, c) { element(b, "button", p, a, c); }
    function script(b, p, path) {} // automatically generates a nonce


    let _b_css = [];
    let _b_js = [];
    let _b_image = [];
    let _b_audio = [];
    let _b_video = [];

    // This automatically watches the file and reloads it when modified
    function load(path) {

        let css = fs.readFileSync(path, {encoding: "utf-8"});
        // clears the interval if the file is not found 
    }

    function _build() {
        // iterate over "nodes" and build the html array/string
    }


    function html() {

        _pages.push({

            body: 0,
            index: 1,
            
            // BUFFERS
            b_head_meta: [],
            b_head_style: [],
            b_head_script: [],
            b_body_element: [],

        });

        _page_index += 1;
        return _page_index;
    }

    return func(request);
}


// PAGE EXAMPLE
async function home(request) {

    let start = performance.now();

    // CHECK REQUEST AND GET DATA
    let data = {
        button_label: ["about", "hem"],
        button_url: ["/about", "/"],
    }

    // CONSTRUCT PAGE FROM DATA
    let page = html();

    // HEAD
    meta(page, head, "");
    style(page, head, "./header.css");

    // BODY
    let header = div(page, body, 'class="header"', "Hello World");
    let product = component.card(page, parent);
    script(page, product, "./product_functions");

    for (let i = 0; i < data.button_label.length; i++) { 
        button(page, header, `class="header-button" href="${data.button_url[i]}"`, data.button_label[i]); 
    }

    console.log((performance.now() - start).toPrecision(1) + " ms");
}



// RENDERER / ROUTER
load("./header.css"); // loads the file string into the b_css then gets inlined in <head> when called with style();
load("./product_functions.js"); // loads the file string into the b_js then gets inlined in parent when called with script();

let pages = [];
let urls = [];
pages.push(home);
urls.push("/");

// if (req.url === "/") { render(home, req); }
*/

let _html = [];
let _indicies = []

function _allocate() {
    //_indicies.pop(); // use a fast_queue here?
    //_html.push(
        // html object
    //);
}

function _deallocate() {

}

let start = performance.now();
async function render(page) {
    
    _allocate();

    // DEFINE FUNCTIONS
    function build() {
        console.log("hello");
    }
    
    // EXPOSE API
    api = { 
        build: build 
    }

    // CALL RENDER TARGET
    await page(api);

    _deallocate();
}

async function page(html) {
    let result = html.build();
    return result;
}

console.log((performance.now() - start).toPrecision(1) + " ms");

render(page);
render(page);

// In head theres a async preload script that loads fonts and media async. when done it sets a DOM body class to loaded
// At the bottom of the body is the async runtime script that makes the body visible once the body class is set to loaded things in the script is loaded.
// all scripts are async by default