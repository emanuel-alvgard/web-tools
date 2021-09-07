'use strict';

import line from './line.mjs';

// DATA
let current_index = 0;
let lines = [];

// ACTIONS
function create() {
    lines.push(
        [
            line.create(),
            line.create(),
            line.create(),
            line.create()
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