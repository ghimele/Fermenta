const { parentPort } = require('worker_threads');

(async () => {

    if (parentPort){
        
        parentPort.postMessage("Job Program Started");
        //check if there is a program running

        //while there is a program running
        //do stuff
        parentPort.postMessage("Job Program Completed");
        parentPort.postMessage('done');
        
        
    }
    else {
        process.exit(0);
    }
})();