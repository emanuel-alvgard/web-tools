'use strict';

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

function subset(data) {
    
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






// TESTING
function test(test_name, test_func, test_data, expected_result) {

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


let data_0 = {
    string: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    pointer: 0
}

let digit_expected = '00000000000000000000000000000000000000000000000000001111111111';
let lower_expected = '00000000000000000000000000111111111111111111111111110000000000';
let upper_expected = '11111111111111111111111111000000000000000000000000000000000000';


test('digit', digit, data_0, digit_expected);
test('lower', lower, data_0, lower_expected);
test('upper', upper, data_0, upper_expected);

let data_1 = {
    string: 'testertestertester',
    pointer: 0,
    target: 'test'
}

let subset_expected = '100100100';

test('subset', subset, data_1, subset_expected);

