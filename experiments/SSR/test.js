const fs = require("fs");
const { inherits } = require("util");
const utils = require("./utils");


const q_create = utils.q_create;
const q_add = utils.q_add;
const q_remove = utils.q_remove;
const filetype = utils.filetype;

let _formats =  {
    code: [".js", ".css"], 
    image: [".jpg", ".png"], 
    audio: [".mp3", ".wav", ".ogg"], 
    video: [".mp4", ".webm", ".ogg"],

    code_buffer: [[], []],
    image_buffer: [],
    audio_buffer: [],
    video_buffer: []
};

let config;

// INTERNAL
let _errors = {
    error_1: "exmple error 1",
    error_2: "example error 2"
};


// @
async function load(path) { // load("./test.css", MEDIA_FORMATS);

    let type = filetype(path);
    let buffer;

    let i0 = _formats.code.indexOf(type);
    let i1 = _formats.image.indexOf(type);
    let i2 = _formats.audio.indexOf(type);
    let i3 = _formats.video.indexOf(type);

    if (i0 !== -1) { buffer = _formats.code_buffer[i0]; }
    else if (i1 !== -1) { buffer = _formats.image_buffer; }
    else if (i2 !== -1) { buffer = _formats.audio_buffer; }
    else if (i3 !== -1) { buffer = _formats.video_buffer; }
    else { return false; }

    let file = await fs.readFile(path, {encoding: "utf-8"}, function() {});

    // it's up to the router/generator to watch the directories and call load on change
    // the router/generator empties all buffers and reloads everything on one change
}



// @
function _head(context) {}


// @HERE
function _element(context,index,type,content) { 

    let e = {
        
        // META
        _index: index,
        _children: [],

        // HTML
        _type: type,
        _id: "",
        _class: "",
        _attr: "",
        _content: content,

        div(content) {
            console.log(context); // @HERE
            context.element.push(_element(context, context.index, "div", content));
            context.element[this._index].push(context.context);
            context.index += 1;
        },

        id(string) { _id = string; return this; },
        class(string) { _class = string; return this; },
        attr(string) { _attr = string; return this; }
    };

    return e; 
}


let max_requests = 3;
let _html = new Array(max_requests);
let _free = q_create(max_requests, -1);

// @
function _init() {
    
    for (let i = 0; i < max_requests; i++) {
        _html[i] = {

            head: _head(this),
            body: _element(this, 0, "body", ""),

            meta: [],
            style: [],
            script: [],
            
            index: 1,
            element: [],

            result: ""

        };

        _html[i].element.push(_html[i].body);

        q_add(i, _free);
    }
}

_init();
_html[0].body.div("test");
console.log(_html);

// @
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

// @
function _deallocate(i) {
    
    let result = _html[i].result;
    
    // RESET OBJECT
    _html[i].head = 0, // reset head props
    
    _html[i].body._index = 0;
    _html[i].body._children = [];
    _html[i].body._type = "";
    _html[i].body._id = "";
    _html[i].body._class = "";
    _html[i].body._attr = "";
    _html[i].body._content = "";

    _html[i].meta = [];
    _html[i].style = [];
    _html[i].script = [];
    _html[i].index = 0;
    _html[i].element = [];
    _html[i].result = "";

    q_add(i, _free);

    return result;
}







async function generate(func, request) {
    
    let index = await _allocate();

    // CALL GENERATION TARGET
    await func(_html[index], request);

    return _deallocate(index);
}

async function page(html, request) {
    return html.build();
}


let start = performance.now();
//let page_1 = generate(page, "");
console.log((performance.now() - start).toPrecision(1) + " ms");


// In head theres a async preload script that loads fonts and media async. when done it sets a DOM body class to loaded
// At the bottom of the body is the async runtime script that makes the body visible once the body class is set to loaded things in the script is loaded.
// all scripts are async by default


















// importing the api.js script is only for helping the IDE with function descriptions.

/* PAGE EXAMPLE
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

*/


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

/*
html.head.meta("");
html.head.style("./header.css");


let header = html.body.div().class("main-header");
header.button("About").class("nav-button");


function navbar(p, label, url) {
    let nav = p.nav();
    nav.button();
    nav.button();
    return nav;
}

let navbar = lib.navbar(header, [], []).class("navbar-top");
*/