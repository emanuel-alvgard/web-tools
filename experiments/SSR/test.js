let fs = require("fs");

// UTILS

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


// @DONE
function q_create(l, v) {

    let q = {
        data: [],
        start: 0,
        end: 0,
        count: 0,
        value: v
    }

    let data = new Array(l);
    let i = 0;
    while (i < l) {
        data[i] = v;
        i += 1;
    }

    q.data = data;

    return q;
}


// @DONE
function q_add(v, q) {

    if (q.count >= q.data.length) { return -1; }

    q.data[q.end] = v;
    q.count += 1;
    q.end += 1;

    if (q.end === q.data.length) { q.end = 0; }

    return q.end - 1;
}

// @DONE
function q_remove(q) {

    if (q.count === 0) { return -1; }

    let result = q.data[q.start];
    q.data[q.start] = q.value;
    q.count -= 1;
    q.start += 1;

    if (q.start === q.data.length) { q.start = 0; }

    return result;
}   















// INTERNAL
let _errors = {
    error_1: "exmple error 1",
    error_2: "example error 2"
};



let _css = [];
let _js = [];
let _image = [];
let _audio = [];
let _video = [];

// This automatically watches the file and reloads it when modified
function load(path) {

    let css = fs.readFileSync(path, {encoding: "utf-8"});
    // clears the interval if the file is not found 
}



function _head() {

}


function _element(h,p,t) { 
    
    // html object

    let element_ = {
        
        _root: 0,
        _children: [],
        _type: t,
        _id: a,
        _content: c,

        id() { return this; },
        class() { return this; }
    };
    return element_; }


function _body(h) { return _element(h); } // @NOT
function _div(h,p) { return _element(); }



let max_requests = 3;
let _html = new Array(max_requests);
let _free = q_create(max_requests, -1);


for (let i = 0; i < max_requests; i++) {
    _html[i] = {

        head: null,
        body: null,

        head_meta: [],
        head_style: [],
        head_script: [],
        body_element: [],

        div: _div(_html[i]),

        result: ""

    };

    q_add(i, _free);
}


async function _allocate() {
    
    let index = q_remove(_free);

    if (index === -1) {
        let a = await new Promise(function (resolve, reject){
            let b = setInterval(function () {
                index = q_remove(_free);
                if (index > -1) {
                    resolve();
                    clearInterval(b);
                }
            });
        });
    }
    return index;
}


// @TEST
async function test() {
    let res = await _allocate();
}

let start = performance.now();
test();
console.log((performance.now() - start).toPrecision(1) + " ms");



function _deallocate(i) {
    
    let result = _html[i].result;
    
    // RESET OBJECT
    _html[i].head_meta = [];
    _html[i].head_style = [];
    _html[i].head_script = [];
    _html[i].body_element = [];
    _html[i].result = "";

    q_add(i, _free);

    return result;
}





/*

async function generate(func, request) {
    
    let index = await _allocate();

    function _element(b, t, p, a, c) {
        
        // give this element a unique index and add that index to the parents "children" array.
        
        return {
            root: 0,
            children: [],
            type: t,
            attributes: a,
            content: c,
        }
    }


    function _style(b, p, path) {} // if style is not present in b_ss -> load the file instead.
    function _div(b, p, a, c) { _element(b, "div", p, a, c); }
    function _button(b, p, a, c) { _element(b, "button", p, a, c); }
    function _script(b, p, path) {} // automatically generates a nonce


    // DEFINE FUNCTIONS
    function _build() {
        console.log("hello");
    }
    
    // EXPOSE API
    api = { 
        build: _build 
    }

    // CALL GENERATION TARGET
    await func(api, request);

    return _deallocate(index);
}

async function page(html, request) {
    return html.build();
}


let start = performance.now();
let page_1 = generate(page, "");
console.log((performance.now() - start).toPrecision(1) + " ms");


// In head theres a async preload script that loads fonts and media async. when done it sets a DOM body class to loaded
// At the bottom of the body is the async runtime script that makes the body visible once the body class is set to loaded things in the script is loaded.
// all scripts are async by default

*/
















// importing the api.js script is only for helping the IDE with function descriptions.

// PAGE EXAMPLE
async function home(html, request) { // change this to objects within api.js? so that the user does not have to create a function????

    // PARSE REQUEST

    // GET DATA
    let data = {
        button_label: ["about", "hem"],
        button_url: ["/about", "/"],
    }

    // GENERATE PAGE FROM DATA

    // HEAD
    html.head.meta("");
    html.head.style("./header.css");

    // BODY
    let header = html.div(html.body, 'class="header"', "Hello World");
    let product = component.card(html, html.body);
    html.script(product, "./product_functions");

    for (let i = 0; i < data.button_label.length; i++) { 
        html.button(header, `class="header-button" href="${data.button_url[i]}"`, data.button_label[i]); 
    }

    return html.build();
}




/*
// GENERATOR / ROUTER
load("./header.css"); // loads the file string into the b_css then gets inlined in <head> when called with style();
load("./product_functions.js"); // loads the file string into the b_js then gets inlined in parent when called with script();

let pages = [];
let urls = [];
pages.push(home);
urls.push("/");

// if (req.url === "/") { 
    // send back as response
    generate(home, req); 
}
*/


let header = html.body.div().class("main-header");
header.button("About").class("nav-button");


function navbar(p, label, url) {
    let nav = p.nav();
    nav.button();
    nav.button();
    return nav;
}

let navbar = lib.navbar(header, [], []).class("navbar-top");
