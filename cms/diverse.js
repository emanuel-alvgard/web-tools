/* UTIL
function get(s) { return document.getElementById(s); }
function create(s, t, c) { 
    let result = document.createElement(s);
    result.textContent = t;
    result.className = c;
    return result; 
}
function hide(e) { e.hidden = true; }
function show(e) { e.hidden = false; }
function option(v,t) { 
    let result = create("option", "");
    result.value = v;
    result.textContent = t;
    return result; 
}

function button(label, classes, func) {
    let b = document.createElement("button");
    b.textContent = label;
    b.className = classes;
    b.onmousedown = func;
    return b;
}


let root = get("root");


function field_panel() {

    // PANEL
    let panel = create("div", "", "field-panel fe");
    let title = create("div", "Field Configuration", "title fe");
    panel.append(title);
    panel.style.backgroundColor = "rbg(200,200,200)";

    // TYPE
    let type_label = create("div", "Types", "label fe");
    panel.append(type_label);

    let type_select = create("select", "", "half-width fe");
    type_select.append(option("str", "String"));
    type_select.append(option("num", "Number"));
    type_select.append(option("file", "File"));
    panel.append(type_select);

    // LIMIT
    let limit_label = create("div", "Item Limit", "label fe");
    panel.append(limit_label);
    let limit_input = create("input", "Item Limit", "half-width fe");
    panel.append(limit_input);

    // SAVE
    let save = create("button", "Save", "button fe");
    panel.append(save);

    // CANCEL
    let cancel = button("Cancel", "button fe", () => { hide(panel); });
    panel.append(cancel);

    root.append(panel);
    hide(panel);
    return panel;
}

//let panel = field_panel();   
let fields = create("div", "", "fields")
let add = create("button", "Add field", "button");
let save = create("button", "Save", "button");
let clear = create("button", "Clear", "button");

root.append(fields);
root.append(add);
root.append(save);
root.append(clear);


function add_field() {
    
    console.log(panel);
    show(panel);                
    
    /*
    let l = document.createElement("div");
    let f = document.createElement("input");
    fields.append(l);
    fields.append(f);
    */
}

add.onmousedown = function () { 
    
    add_field(); 
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/create", true);
    request.setRequestHeader("Accept", "*/*");
    request.onreadystatechange = function () {
        if (request.readyState === request.DONE) {
            console.log(request.response);
        }
    }
    request.onerror = function(e) {
        console.log(e);
    }
    try { request.send(); } catch (e) {}
}

save.onmousedown = function () { 

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/save", true);
    request.setRequestHeader("Accept", "*/*");
    request.onreadystatechange = function () {
        if (request.readyState === request.DONE) {}
    }
    request.send();

}

clear.onmousedown = function () { 

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/clear", true);
    request.setRequestHeader("Accept", "*/*");
    request.onreadystatechange = function () {
        if (request.readyState === request.DONE) {}
    }
    request.send();
    }