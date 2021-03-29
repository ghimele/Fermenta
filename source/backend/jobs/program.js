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
            Temperature=value.Value;
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
    var currentTime = undefined;
    var elapsedTime = undefined;
    var targetEndTime = undefined;

    var startDoughVolume = undefined;
    var startDoughHeight = undefined;

    var currentVolume = undefined;
    var currentDoughHeight = undefined;

    var targetVolume = undefined;
    var targetDoughHeight = undefined;
    var targetHeight = undefined;

    var containerHeight = undefined;
    var containerSurface = undefined;
    var containerVolume = undefined;
    
    var startTemp = undefined;
    var currentTemp = undefined;
    var targetTemp = undefined;

    if (parentPort){
        log("Job Program Started on "+ Date());

        //check if there is a program to run
        var scheduledProgram=utils.db.GetScheduledProgram();
        if(scheduledProgram.data!==undefined){
            log("ScheduledID: "+ scheduledProgram.data.ID);
            log("ProgramID: "+ scheduledProgram.data.PROGRAMID);
            var program = utils.db.GetProgram(scheduledProgram.data.PROGRAMID);

            var data= JSON.parse(program.data.DATA);

            containerHeight = data.Height;
            containerSurface = data.Width * data.Length;
            containerVolume = containerSurface * containerHeight;
            log("Container Volumer: "+ containerVolume);
            if(data.Cycles.length>0){
                
                while(!completed){
                    //every 1s while there is a program running
                    //do stuff

                    //send a request to the main thread to get distance and temp
                    request("GetDistance");
                    request("GetTemperature");

                    await delay(1000);

                    //log("read Distance: "+ Distance);
                    //log("read Temperature: "+ Temperature);

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

                            startTime = Date.now();
                            sendData("startTime", startTime);
                            startTemp = Temperature; 
                            sendData("startTemperature", startTemp);
                            startDoughHeight= (containerHeight - Distance).toFixed(2);
                            sendData("startDoughHeight", startDoughHeight);
                            startDoughVolume = (containerSurface * startDoughHeight).toFixed(2);
                            sendData("startDoughVolume", startDoughVolume);

                            endCycle = data.Cycles[cycleIndex].End;
                            log("Cycle Index: " + cycleIndex);
                            log("End Type: " + endCycle.Type);
                            if(endCycle.Type === "Duration")
                            {
                                targetEndTime = (Number(endCycle.Duration)*60000); //Duration is expressed in minutes
                                log("targetEndTime: " + Math.round(targetEndTime / 60000) + " minutes");
                            }
                            else if(endCycle.Type==="Volume"){
                                targetHeight = Number(endCycle.Volume) * startDoughHeight;
                                targetVolume = Number(endCycle.Volume) * startDoughVolume;
                                log("targetVolume: " + targetVolume);
                            }
                            else if(endCycle.Type==="Temperature"){
                                targetTemp = Number(endCycle.Temperature);
                                log("targetTemp: " + targetTemp);
                            } 
                        }

                        currentTemp = Temperature;
                        currentDoughHeight = (containerHeight - Distance).toFixed(2);
                        currentVolume = (containerSurface * currentDoughHeight).toFixed(2);
                        currentTime = Date.now();

                        elapsedTime = currentTime - startTime;
                        //log("elapsed: " + Math.floor((elapsedTime % 60000)/1000));
                        if(Math.floor((elapsedTime % 60000)/1000)===0){
                            //send data every minute
                            log("Elpsed Time = " + elapsedTime + " milliseconds" );
                            log("Elpsed Time = " + Math.round(elapsedTime/60000) + " minutes" );
                            sendData("currentTemp", currentTemp);
                            sendData("currentDoughHeight", currentDoughHeight);
                            sendData("currentVolume", currentVolume);
                        }

                        if(endCycle.Type==="Duration"){
                            if(elapsedTime>targetEndTime){
                                log("minutes elapsed: "+ Math.round(elapsedTime/60000));
                                cycleCompleted=true;
                                cycleIndex++;
                            }
                        }
                        else if(endCycle.Type==="Volume"){
                            if(currentVolume>= targetVolume){
                                cycleCompleted=true;
                                cycleIndex++;
                            }
                        }
                        else if(endCycle.Type==="Temperature"){
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
        MessageType : "Request",
        Name : "",
        Value : message
    };

    parentPort.postMessage(mess);
}

function sendData(name,value){
    //send a message type Data to the main thread.
    const mess={
        MessageType : "Data",
        Name : name,
        Value : value
    };

    parentPort.postMessage(mess);
}