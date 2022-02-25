'use strict';

// CHARACTER TYPES

// @DONE
function chr_digit(character) {
    let c = character.charCodeAt(0);
    if (c < 48) { return false; }
    if (c > 57) { return false; }
    return true;
}

// @DONE
function chr_lower(character) {
    let c = character.charCodeAt(0);
    if (c < 97) { return false; }
    if (c > 122) { return false; }
    return true;
}

// @DONE
function chr_upper(character) {
    let c = character.charCodeAt(0);
    if (c < 65) { return false; }
    if (c > 90) { return false; }
    return true;
}

// @DONE 
function chr_custom(character, custom) {
    
    let len = custom.length;

    let i = 0;
    while (i < len) {
        if (character == custom[i]) { return true; }
        i += 1;
    }
    return false;
}


// STRING TYPES

// @ADD paramater for exact str length
function str_static(str, target) {
    
    let target_len = target.length;
    let p = str.pointer;
    let l = str.length;
    let s = str.string;

    let i = 0;
    while (i < target_len) {
        if ((p + i) >= l) { return false; }
        if (s[p + i] !== target[i]) { return false; }
        i += 1;
    }

    // @ADD
    /*
    if (exact === true) {
        if (l > i) { return false; }
    }
    */

    str.pointer += i;
    return true;
}

// @DONE
function str_dynamic(str, categories, custom, limit, delimiters) {
    
 
    let categories_len = categories.length;
    let p = str.pointer;
    let l = str.length;
    let s = str.string;

    let i = 0;
    while (delimiters.includes(s[p + i]) === false) {

        // CHECK LIMIT
        if ((p + i) >= l) { i += 1; break; }
        if (i >= limit) { return false; }

        let category = 0;

        // CHECK CATEGORIES
        if (categories_len > 0) {
            let j = 0;
            while (j < categories_len) {
                if (categories[j] === 'a') { if (chr_lower(s[p + i])) { category = 1; break; } }
                if (categories[j] === '0') { if (chr_digit(s[p + i])) { category = 1; break; } }
                if (categories[j] === 'A') { if (chr_upper(s[p + i])) { category = 1; break; } }
                j += 1;
            }
        }

        // CHECK CUSTOM
        if (category === 0) {
            if (custom.includes(s[p + i]) === false) { return false; }
        }
        i += 1;
    }
    str.pointer += i;
    return true;
}




// @ADD NUMBER TYPES

// num_decimal
// num_integer



// @EXPORT
exports.chr_digit = chr_digit;
exports.chr_lower = chr_lower;
exports.chr_upper = chr_upper;
exports.chr_custom = chr_custom;

exports.str_static = str_static;
exports.str_dynamic = str_dynamic;

// exports.num_integer = num_integer;
// exports.num_decimal = num_decimal;



/* @TEST

let str = {
    pointer: 0,
    length: 0,
    string: "1Aa&/!."
};

str.length = str.string.length;

console.log(chr_digit(str.string[0]));
console.log(chr_digit(str.string[1]));

console.log(chr_lower(str.string[2]));
console.log(chr_lower(str.string[0]));

console.log(chr_upper(str.string[1]));
console.log(chr_upper(str.string[0]));

console.log(chr_custom(str.string[3], "&/!"));
console.log(chr_custom(str.string[3], "/!_"));

console.log(str_static(str, "1Aa&/!."));
str.pointer = 0;
console.log(str_static(str, "1A+&/!."));
str.pointer = 0;

console.log(str_dynamic(str, "a0A", "&./!", 4, "/"));
str.pointer = 0;
console.log(str_dynamic(str, "aA", "&./!", 4, "/"));
str.pionter = 0;

*/