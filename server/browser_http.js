'use strict';



// BROWSER HTTPS
function https_result() { return { value: "", state: 0 }; }


// Browser @NOT
async function https_request(path, content, timeout, result) {

    if (result.state === 1) { console.log("busy"); return; }

    let request = new XMLHttpRequest();
    request.timeout = timeout;
    request.open("POST", "https://" + path, true);

    request.onreadystatechange = function () {
        if (request.readyState === request.DONE) {
            result.value = request.response
            result.state = 2;
            return;
        }
    }
    request.ontimeout = function () {
        result.state = 3;
        return;
    }
    result.state = 1;
    request.send(content);
}