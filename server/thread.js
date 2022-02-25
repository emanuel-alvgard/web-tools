
// create thread versioning mechanism.
let thread_number = 0;


function validate_request() {
    return;
}




// @NOT
const { parentPort, workerData } = require("worker_threads");

let message = "";

parentPort.on('message', function(data) { 
	message = data; 
	console.log(data);
	if (data === 'exit') { process.exit(); }
}); 

console.log("this is thread number: " + workerData);


