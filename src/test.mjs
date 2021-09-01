import View from "./view.mjs";

let view = View.create();

// HEADER BUTTONS
View.comment("HEADER");
let home = View.button("HOME");
let about = View.button("ABOUT");
let contact = View.button("CONTACT");

// ID
View.set_id(home, "home-button");
View.set_id(about, "about-button");
View.set_id(contact, "contact-button");

// CLASS
View.set_class(home, "menu-button");
View.set_class(about, "menu-button");
View.set_class(contact, "menu-button");

// BACKGROUND COLOR
View.set_background_color(home, "rgb(255, 255, 255)");
View.set_background_color(about, "rgb(255, 255, 255)");
View.set_background_color(contact, "rgb(255, 255, 255)");

let result = View.build();

console.log(result);

