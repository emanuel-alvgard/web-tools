






let box_1 = Rectangle.create();

get("lines", box_1);

let lines = [0, 1, 2, 3];

point

let box_2 = Rectangle.create();



// 4 Line
// 8 Points

Translation.add_relation(box_1, box_2, 1.0);
Rotation.add_relation(box_1, box_2, 1.0);


Translation.start_animation('x', box_1, button, false);
Translation.stop_animation('x', box_1, button, false);


