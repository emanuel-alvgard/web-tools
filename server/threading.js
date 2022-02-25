// get logical cpu count
// create worker threads equal to that amount
// see how much async work can be done by each thread
// 


const { Worker } = require("worker_threads");
const os = require('os');
const thread_count = (os.cpus().length) - 1;

let currrent_thread = 0;
let threads = [];

for (let i = 0; i < thread_count; i += 1) {
    threads.push(new Worker('./thread.js', {workerData: i}));
}

sleep(500);

for (let i = 0; i < thread_count; i += 1) {

    sleep(200);
    threads[i].postMessage("Hey there thread " + i + "from main :)");

}

for (let i = 0; i < thread_count; i += 1) {

    threads[i].postMessage("exit");
}



// create dedicated I/O thread for inputting new domains
// for each worker thread pass a message

console.log(threads.length);