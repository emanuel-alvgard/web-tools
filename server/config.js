'use strict';
let parse = require('./parse.js');
let fs = require('fs');

// CHECK IF FILE EXISTS


// ARRAY UTILS
function array_equals(subject, target) {

    let len = target.length;
    let i = 0;
    while (i < len) {
        if (subject[i] !== target[i]) { return false; }
        i += 1;
    }
    return true;
}

function array_swap(subject, target) {

    target.length = 0;
    let len = subject.length;
    let i = 0;
    while (i < len) {
        target.push(subject[i]);
        i += 1;
    }
    return;
}

// GLOBAL
let states = { reloading: 0 };
let ports = [];
let certificates = [];
let domains = [];

function reload_config(ports, certificates, domains, states) {

    let new_ports = [];
    let new_certificates = [];
    let new_domains = [];

    // READ CONFIG
    let str = { val: '' };
    let ptr = { val: 0 };
    let len = 0;

    str.val = fs.readFileSync('./.config', { encoding: 'utf8', flag: 'r' });
    ptr.val = 0;
    len = str.val.length;

    // PARSE CONFIG
    let i = 0;
    let line = 1;
    while (ptr.val < len) {

        // PARSE NEWLINE
        while (true) {
            if (parse.str_precise(str, ptr, len, '\r\n')) { line += 1; continue; }
            if (parse.str_precise(str, ptr, len, '\n')) { line += 1; continue; }
            break;
        }
        line += 1;

        i = ptr.val;

        // PARSE PORT
        if (parse.str_custom(str, ptr, len, '0', '', 5, ' ') === false) {
            console.log('line ' + line + ': Invalid port number.');
            return;
        }

        new_ports.push(parseInt(str.val.substring(i, (ptr.val - i))));

        if (parse.str_precise(str, ptr, len, ' : ') === false) {
            console.log('line ' + line + ': Invalid format. Expected(port : domain : certificate).');
            return;
        }

        i = ptr.val;

        // PARSE CERTIFICATE
        if (parse.str_custom(str, ptr, len, 'aA0', '', 255, '.') === false) {
            console.log('line ' + line + ': Invalid certificate.');
            return;
        }

        if (parse.str_precise(str, ptr, len, '.crt') === false) {
            console.log('line ' + line + ': Invalid certificate.');
            return;
        }

        new_certificates.push(str.val.substring(i, (ptr.val - i)));

        if (parse.str_precise(str, ptr, len, ' : ') === false) {
            console.log('line ' + line + ': Invalid format. Expected(port : certificate : domain).');
            return;
        }

        i = ptr.val;

        // PARSE DOMAIN
        while (true) {
            if (parse.str_custom(str, ptr, len, 'a', '', 63, '.\n\r') === false) {
                console.log('line ' + line + ': Invalid domain name.');
                return;
            }
            if (ptr.val >= len) { break; }
            if (parse.str_precise(str, ptr, len, '.')) { continue; }

            new_domains.push(str.val.substring(i, (ptr.val - i)));

            if (parse.str_precise(str, ptr, len, '\n')) { break; }
            if (parse.str_precise(str, ptr, len, '\r\n')) { break; }
        }

        // PARSE END
        if (ptr.val >= len) { break; }
    }

    states.reloading = 1;

    array_swap(new_ports, ports);
    array_swap(new_certificates, certificates);
    array_swap(new_domains, domains);

    states.reloading = 0;
    return;
}





// MAIN
process.stdin.on('data', function (data) {

    let start = performance.now();

    let str = { val: data.toString() };
    let ptr = { val: 0 };
    let len = str.val.length;

    if (parse.str_precise(str, ptr, len, 'reload')) {
        reload_config(ports, certificates, domains, states);
        console.log('configuration reloaded.');
    }

    // all other commands


    else { console.log('Unknown command.'); }

    let end = performance.now();
    console.log(end - start);

    return;
});

