import View from "view.js"

let view = View.create();

let menu = View.add("div", view, "Hello!");
let home_button = View.add("button", menu, "HOME");
let about_button = View.add("button", menu, "ABOUT");
let contact_button = View.add("button", menu, "CONTACT");