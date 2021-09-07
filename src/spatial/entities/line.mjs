'use strict';

import point from '.point/.mjs';

// DATA
let current_index = 0;
let points = [];

// ACTIONS
function create() {
    points.push(
        [
            point.create(),
            point.create(),
        ]
    );

    current_index += 1;
    return current_index - 1;

}

function get(data, index) {
    
    switch (data) {
        case 'lines': return sides[index]; break;
        default: return 'data not found'; break;
    }
    
}

export default { 
    create,
    get 
}