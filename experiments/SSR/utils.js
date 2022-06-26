// @DONE
function digit(c) { // digit("1");
    let i = chr.charCodeAt(0);
    if (i < 48) { return false; }
    if (i > 57) { return false; }
    return true;
}

// @DONE
function lower(c) { // lower("a");
    let i = chr.charCodeAt(0);
    if (i < 97) { return false; }
    if (i > 122) { return false; }
    return true;
}

// @DONE
function upper(c) { // upper("A");
    let i = chr.charCodeAt(0);
    if (i < 65) { return false; }
    if (i > 90) { return false; }
    return true;
}

// @DONE
function symbol(c, s) { // symbol("&", ["&", ":", "/"]);
    if (s.includes(c)) { return true; }
    return false;
}


// @DONE
function string(s, t, p={position:0,previous:0}) { // string("simple test", "simple", {position:0, previous:0});

    let i = p.position;
    let j = 0;
    
    while (j < t.length) {
        if (i >= s.length) { return false; }
        if (s[i] !== t[j]) { return false; }
        i ++; j ++;
    }

    p.previous = p.position; 
    p.position = i;

    return true;
}

// @DONE
function filetype(s) {
    for (let i = (s.length -1); i > 0; i--) {
        if (s[i] === ".") {
            return s.substring(i, s.length);
        }
    }
    return "unknown";
}


// @DONE
function q_create(l, v) {

    let q = {
        data: [],
        start: 0,
        end: 0,
        count: 0,
        value: v
    }

    let data = new Array(l);
    let i = 0;
    while (i < l) {
        data[i] = v;
        i += 1;
    }

    q.data = data;

    return q;
}


// @DONE
function q_add(v, q) {

    if (q.count >= q.data.length) { return -1; }

    q.data[q.end] = v;
    q.count += 1;
    q.end += 1;

    if (q.end === q.data.length) { q.end = 0; }

    return q.end - 1;
}

// @DONE
function q_remove(q) {

    if (q.count === 0) { return -1; }

    let result = q.data[q.start];
    q.data[q.start] = q.value;
    q.count -= 1;
    q.start += 1;

    if (q.start === q.data.length) { q.start = 0; }

    return result;
}