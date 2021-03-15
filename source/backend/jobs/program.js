const { parentPort } = require('worker_threads');
var utils = require('../utils/index');
// var log4js = require('log4js');
// var joblog = log4js.getLogger("job"); 
(async () => {
    var completed=false;
    if (parentPort){
        parentPort.postMessage("Job Program Started");
        let start = Date.now();
        parentPort.postMessage("Started: "+ start);
        //check if there is a program running
        var scheduledProgram=utils.db.GetScheduledProgram();

        parentPort.postMessage("ProgramID: "+ scheduledProgram.data.PROGRAMID);
        var program = utils.db.GetProgram(scheduledProgram.data.PROGRAMID);

        var data= JSON.parse(program.data.DATA);

        var interval=(Number(data.Cycles[0].Duration)*60000);
        parentPort.postMessage("interval: "+ interval);
        //var interval=5*60;
        while(!completed){
            //while there is a program running
            //do stuff

            let end = Date.now();
            //parentPort.postMessage("end: "+ end);
            var elapsed =Math.floor(end - start) ;
            //joblog.log("seconds elapsed: "+ elapsed);
            //parentPort.postMessage("seconds elapsed: "+ elapsed);
            if(elapsed>interval){
                parentPort.postMessage("seconds elapsed: "+ elapsed);
                completed=true;
            }
        }

        parentPort.postMessage("Job Program Completed");
        parentPort.postMessage('done');
        //process.exit(0);
    }
    else {
        process.exit(0);
    }
})();