data = {
    string: "Aaaa0123",
    pointer: 0
}

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

let i = 0;
let len = data.string.length;
while (i < len) {
    if (digit(data)) { console.log("digit"); i += 1; continue; }
    if (lower(data)) { console.log("lower"); i += 1; continue; }
    if (upper(data)) { console.log("upper"); i += 1; continue; }
}


console.log(data.pointer);