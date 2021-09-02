// This runtime is loaded into memory when the server starts so that it's a 
// string ready for concatenation in an inline script


data = {
    z: [],
    scale: [],
    rotation: [],

    A: [], // x-translation
    B: [], // width
    C: [], // y-translation
    D: [], // height

    A_link: [],
    B_link: [],
    C_link: [],
    D_link: [],

    A_multiplier: [],
    B_multiplier: [],
    C_multiplier: [],
    D_multiplier: [],

    u_z: [],
    u_scale: [],
    u_rotation: [],

    u_A: [],
    u_B: [],
    u_C: [],
    u_D: []
}


function link_element() {}
function link_face(subject_face, subject_index, target_face, target_index, multiplier) {
    
    data[subject_face + '_link'][subject_index] = [target_face, target_index];
    data[subject_face + '_multiplier'][subject_index] = multiplier;
    return 
}

function unlink_element() {}
function unlink_face() {}

function update_links() {
    // update A,B,C,D according to thier link and multiplier data
}


function create() {}

function update() {
    // updates the DOM and calls
    return window.requestAnimationFrame(update);
}

export default {
    link_element,
    link_face,

    unlink_element,
    unlink_face,

    update_links
}

