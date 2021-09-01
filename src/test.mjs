import View from "./view_server.mjs";

let view = View.create();

// HEADER BUTTONS
View.comment("HEADER");
let home = View.element("button", "HOME");
let about = View.element("button", "ABOUT");
let contact = View.element("button", "CONTACT");

// id
View.set_id(home, "home-button");
View.set_id(about, "about-button");
View.set_id(contact, "contact-button");

// class
View.set_class(home, "menu-button");
View.set_class(about, "menu-button");
View.set_class(contact, "menu-button");

// style
View.set_style("background-color", home, "rgb(255, 255, 255)");
View.set_style("background-color", about, "rgb(255, 255, 255)");
View.set_style("background-color", contact, "rgb(255, 255, 255)");

// SCRIPTS
View.script_inline("console.log('this is inlined!')");
View.script_module("./example.mjs");
View.script_file("./example.js");


// links home to contact with speed-multipliers for (x, y, z, scale, rotation)
View.link_element_relative(home, contact, 1.0, 1.0, 1.0, 1.0, 1.0);

// links home to contact with absolute values for (x, y, z, scale, rotation)
View.link_element_absolute(home, contact, 500, 500, 1, 1.0, 0);

// links face A of home to face B of contact with a multiplier for (speed)
View.link_face_relative("A", home, "B", contact, 1.0);

// links face A of home to face B of contact with absolute values for (distance)
View.link_face_absolute("A", home, "B", 500);

let result = View.build();

console.log(result);

