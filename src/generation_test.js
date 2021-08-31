import View from "view.js"

let view = View.create();

// e = element
// a = attribute
// c = component

// HEADER
let home = View.eButton("HOME");
View.aId(home, "home-button");
View.aClass("dynamic");

let about = View.eButton("ABOUT");
let contact = View.eButton("CONTACT");


let result = View.build();


