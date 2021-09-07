"use strict";

// A spatial compound abstraction is only a collection of the lowest spatial abstraction
// present in the application structure.



// RELATION
let target = []; // -1 if face has no target
let prev_pos = [];
let multiplier = [];

function add_relation(_subject, _target, _multiplier) {

    lock_target[subject] = target;
    lock_multiplier[subject] = multiplier;

}

function remove_relation(subject) {}
function update_relations()


// ANIMATION
function add_animation() {}
function start_animation(axis, subject, trigger, reset) {}
function stop_animation(axis, subject, trigger, reset) {}
function remove_animation(subject) {}
function update_animations() {}


function create() {

}

function update() {
    update_relations();
    update_animations();
} 



// EXAMPLE
Translation.add_relation(some_face, other_face, 1.0);
Translation.add_animation(some_face, 100, 1.0, CURVE_LINEAR);

Animation.add('t_x', some_face, 100, 1.0, CURVE_LINEAR);
Animation.start('tx', some_face);


