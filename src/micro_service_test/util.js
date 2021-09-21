'use strict';

// CHARACTER
function digit(data) {
    let c = data.string.charCodeAt(data.pointer);
    if (c < 48) { return false; }
    if (c > 57) { return false; }
    data.pointer += 1;
    return true;
}

function lower(data) {
    let c = data.string.charCodeAt(data.pointer);
    if (c < 97) { return false; }
    if (c > 122) { return false; }
    data.pointer += 1;
    return true;
}

function upper(data) {
    let c = data.string.charCodeAt(data.pointer);
    if (c < 65) { return false; }
    if (c > 90) { return false; }
    data.pointer += 1;
    return true;
}

function symbol(data, symbol) {
    
}
// symbol(data, '|');


// STRING
function static(data, string) {
    
    let i = 0;
    let target_len = data.target.length;
    let string_len = data.string.length;
    while (i < target_len) {
        if (data.pointer >= string_len) { 
            data.pointer -= i;
            return false;
        }
        if (data.string[data.pointer] !== data.target[i]) { 
            data.pointer -= i;
            return false; 
        }
        else { 
            data.pointer += 1; 
            i += 1; 
        }
    }
    return true;
}


function dynamic(data) {
    
}

// example 


// dynamic_subset(data, 'Aa0.', 50, '|:,');


// TESTING
function test_0(test_name, test_func, test_data, expected_result) {

    test_data.pointer = 0;

    let result = '';
    let i = 0;
    let len = test_data.string.length;
    while (i < len) {
        if (test_data.pointer >= len) { break; }
        if (test_func(test_data)) { result += '1'; }
        else { result += '0'; test_data.pointer += 1; }
        i += 1;
    }

    if (result === expected_result) { console.log('[' + test_name + ']'); }
    else { console.log(
        '[' + test_name + ']'
        + '[FAILED]:\n(expected)\n"' 
        + expected_result 
        + '"\n' 
        + '(returned)\n' 
        + '"' 
        + result 
        + '"'
        ); 
    }
    return;
}


let data = {
    string: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    pointer: 0
}

let digit_expected = '00000000000000000000000000000000000000000000000000001111111111';
let lower_expected = '00000000000000000000000000111111111111111111111111110000000000';
let upper_expected = '11111111111111111111111111000000000000000000000000000000000000';


test_0('digit', digit, data, digit_expected);
test_0('lower', lower, data, lower_expected);
test_0('upper', upper, data, upper_expected);


let static_subset_expected = '100100100';

test_1('static_subset', static_subset, data, static_subset_expected);

