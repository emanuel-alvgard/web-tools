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
function static_string(data, string) {
    
    let i = 0;
    let string_len = string.length;
    let data_len = data.string.length;
    while (i < string_len) {
        if (data.pointer >= data_len) { 
            data.pointer -= i;
            return false;
        }
        if (data.string[data.pointer] !== string[i]) { 
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


function dynamic_string(data) {
    
}

// example 


// dynamic_subset(data, 'Aa0.', 50, '|:,');















// TESTING
function test(test_type, test_name, test_func, test_data, p, expected_result) {

    test_data.pointer = 0;

    let result = '';
    let i = 0;
    let len = test_data.string.length;
    while (i < len) {
        if (test_data.pointer >= len) { break; }
        switch (test_type) {
            case 0: if (test_func(test_data)) { result += '1'; i += 1; continue; } break;
            case 1: if (test_func(test_data,p[0])) { result += '1'; i += 1; continue; } break;
            case 2: if (test_func(test_data,p[0],p[1])) { result += '1'; i += 1; continue; } break;
            case 3: if (test_func(test_data,p[0],p[1],p[2])) { result += '1'; i += 1; continue; } break;
            case 4: if (test_func(test_data,p[0],p[1],p[2],p[3])) { result += '1'; i += 1; continue; } break;
            case 5: if (test_func(test_data,p[0],p[1],p[2],p[3],p[4])) { result += '1'; i += 1; continue; } break;
        }
        result += '0'; 
        test_data.pointer += 1; 
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


test(0, 'digit', digit, data, null, digit_expected);
test(0, 'lower', lower, data, null, lower_expected);
test(0, 'upper', upper, data, null, upper_expected);

let static_string_expected = '100000000000000000000000000000000000000000000000000000000000';
test(1, 'static_string', static_string, data, ['ABC'], static_string_expected);

