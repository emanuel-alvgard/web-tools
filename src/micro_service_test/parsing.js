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
    let c = data.string.charCodeAt(data.pointer);
    if ( c !== symbol) { return false; }
    data.pointer += 1;
    return true;
}

function character_filter(data, filter) {
    
    let i = 0;
    let filter_len = filter.length;
    let c = data.string[data.pointer];
    while (i < filter_len) {
        if (filter[i] === 'A') { if (upper(data)) { data.pointer += 1; return true; }}
        if (filter[i] === 'a') { if (lower(data)) { data.pointer += 1; return true; }}
        if (filter[i] === '0') { if (digit(data)) { data.pointer += 1; return true; }}
        if (filter.includes(c)) { data.pointer += 1; return true; }
        i += 1;
    }
    return false;
}



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



function dynamic_string(data, filter, length, delimiters) {
    
    let i = 0;
    let data_len = data.string.length;
    while (i < data_len) {
        if (data.pointer >= data_len) { 
            data.pointer -= i; 
            return false; 
        }
        if (delimiters.includes(data.string[i])) {
             break; 
        }
        if (!character_filter(data, filter)) { return false; }
        else { i += 1; }
    }
    if (i > length) {
        data.pointer -= i; 
        return false;
    }
    return true;
}










// TESTING
function array_equals(array_1, array_2) {
    
    for (let i = 0; i < array_1; i += 1) {
        if (array_1[i] !== array_2[i]) { return false; }
    }
    return true;
}


function test(test_type, test_name, test_func, test_data, p, expected_result) {

    test_data.pointer = 0;

    let result = [];
    let i = 0;
    let len = test_data.string.length;
    while (i < len) {
        if (test_data.pointer >= len) { break; }
        let c = test_data.string[test_data.pointer];
        switch (test_type) {
            case 0: if (test_func(test_data)) { result.push(c); i += 1; continue; } break;
            case 1: if (test_func(test_data,p[0])) { result.push(c); i += 1; continue; } break;
            case 2: if (test_func(test_data,p[0],p[1])) { result.push(c); i += 1; continue; } break;
            case 3: if (test_func(test_data,p[0],p[1],p[2])) { result.push(c); i += 1; continue; } break;
            case 4: if (test_func(test_data,p[0],p[1],p[2],p[3])) { result.push(c); i += 1; continue; } break;
            case 5: if (test_func(test_data,p[0],p[1],p[2],p[3],p[4])) { result.push(c); i += 1; continue; } break;
        }
        result.push('!' + c); 
        test_data.pointer += 1; 
        i += 1;
    }

    if (array_equals(result, expected_result)) { console.log('[' + test_name + ']'); }
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

let upper_true = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let upper_false = ['!A','!B','!C','!D','!E','!F','!G','!H','!I','!J','!K','!L','!M','!N','!O','!P','!Q','!R','!S','!T','!U','!V','!W','!X','!Y','!Z'];

let lower_true = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let lower_false = ['!a','!b','!c','!d','!e','!f','!g','!h','!i','!j','!k','!l','!m','!n','!o','!p','!q','!r','!s','!t','!u','!v','!w','!x','!y','!z'];

let digit_true = ['0','1','2','3','4','5','6','7','8','9'];
let digit_false = ['!0','!1','!2','!3','!4','!5','!6','!7','!8','!9'];

let digit_expected = [].concat(upper_false, lower_false, digit_true);
let lower_expected = [].concat(upper_false, lower_true, digit_false);
let upper_expected = [].concat(upper_true, lower_false, digit_false);
let character_filter_expected = [].concat(upper_true, lower_false, digit_true);

test(0, 'digit', digit, data, null, digit_expected);
test(0, 'lower', lower, data, null, lower_expected);
test(0, 'upper', upper, data, null, upper_expected);
test(1, 'character_filter', character_filter, data, ['A0'], character_filter_expected);

// let static_string_expected = '100000000000000000000000000000000000000000000000000000000000';
// test(1, 'static_string', static_string, data, ['ABC'], static_string_expected);
