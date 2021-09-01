import View from "./view.mjs";

let view = View.create();

// HEADER
let home = View.button("HOME");
View.set_id(home, "home-button");
View.set_class(home, "hej");

let about = View.button("ABOUT");
let contact = View.button("CONTACT");

let result = View.build();

console.log(result);

