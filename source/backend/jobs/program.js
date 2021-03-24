const { parentPort } = require('worker_threads');
const utils = require('../utils');

var Distance="";
var Temperature="";
const delay = ms => new Promise(res => setTimeout(res, ms));

//get messages from main thread
parentPort.on("message", (value)=>{
    if(value.MessageType==="Data"){
        if(value.Name==="Distance"){
            Distance=value.Value;
        }
        else if(value.Name==="Temperature"){
            Temperature="";
        }
    }
});

(async () => {
    var completed = false;
    var firstCycle= true;
    var cycleCompleted = false;
    var cycleIndex = 0;
    var endCycle = undefined;
    var startTime = undefined;
    var targetEndTime = undefined;
    var startVolume = undefined;
    var targetVolume = undefined;
    var containerVolume = undefined;
    var startTemp = undefined;
    var targetTemp = undefined;


    if (parentPort){
        log("Job Program Started on "+ Date());

        //check if there is a program to run
        var scheduledProgram=utils.db.GetScheduledProgram();
        if(scheduledProgram.data!==undefined){
            //parentPort.postMessage(utils.Message("ScheduledID: "+ scheduledProgram.data.ID));
            log("ScheduledID: "+ scheduledProgram.data.ID);
            log("ProgramID: "+ scheduledProgram.data.PROGRAMID);
            //parentPort.postMessage(utils.Message("ProgramID: "+ scheduledProgram.data.PROGRAMID));
            var program = utils.db.GetProgram(scheduledProgram.data.PROGRAMID);

            var data= JSON.parse(program.data.DATA);
            if(data.Cycles.length>0){
                
                while(!completed){
                    //every 1s while there is a program running
                    //do stuff
                    await delay(1000);

                    //send a request to the main thread to get distance and temp
                    request("GetDistance");
                    request("GetTemperature");

                    log("read Distance: "+ Distance);
                    log("read Temperature: "+ Temperature);

                    if(cycleIndex >= data.Cycles.length){
                        //There are no more Cycles available,
                        //We have completed the program
                        completed = true;
                    }
                    else{
                        if(firstCycle || cycleCompleted){
                            // We've completed a cycle or it is the first cycle so now we need to
                            // initialized the variables for the cycle
                            firstCycle = false;
                            cycleCompleted = false;

                            endCycle = data.Cycles[cycleIndex].End;
                            log("Cycle Index: " + cycleIndex);
                            log("End Type: " + endCycle.Type);
                            if(endCycle.Type === "Duration")
                            {
                                startTime = Date.now();
                                targetEndTime = (Number(endCycle.Duration)*60000); //Duration is expressed in minutes
                                log("targetEndTime: " + targetEndTime);
                            }
                            else if(endCycle.Type==="Volume"){
                                startVolume = Distance; // we need to get the value from the sensor
                                targetVolume = Number(endCycle.Volume)*startVolume;
                                log("targetVolume: " + targetVolume);
                            }
                            else if(endCycle.Type==="Temperature"){
                                startTemp = 10; // we need to get the value from the sensor
                                targetTemp = Number(endCycle.Temperature);
                                log("targetTemp: " + targetTemp);
                            } 
                        }

                        if(endCycle.Type==="Duration"){
                            let endtime = Date.now();
    
                            var elapsedTime =Math.floor(endtime - startTime);
                            if(elapsedTime>targetEndTime){
                                log("seconds elapsed: "+ elapsedTime);
                                cycleCompleted=true;
                                cycleIndex++;
                            }
                        }
                        else if(endCycle.Type==="Volume"){
                            var currentVolume = 2*startVolume; // we need to get the value from the sensor
                            if(currentVolume>= targetVolume){
                                cycleCompleted=true;
                                cycleIndex++;
                            }
                        }
                        else if(endCycle.Type==="Temperature"){
                            var currentTemp = 20 // we need to get the value from the sensor
                            if(currentTemp >= targetTemp){
                                cycleCompleted=true;
                                cycleIndex++;
                            }
                        }
                    }
                }

                var ret=utils.db.DisableScheduledProgram(scheduledProgram.data.ID);
                if(ret.error){
                    error(ret.message);
                    process.exit(1);
                }
            }
        }

        log("Job Program Completed on "+ Date());
        parentPort.postMessage('done');
    }
    else {
        process.exit(0);
    }
})();


function log(message){
    const mess={
        MessageType : "Log",
        Name : "",
        Value : message
    };

    parentPort.postMessage(mess);
}

function error(message){
    const mess={
        MessageType : "Error",
        Name : "",
        Value : message
    };

    parentPort.postMessage(mess);
}

function request(message){
    //send a message type Data to the main thread.
    const mess={
        MessageType : "Data",
        Name : "",
        Value : message
    };

    parentPort.postMessage(mess);
}