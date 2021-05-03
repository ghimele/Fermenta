const { parentPort } = require('worker_threads');
const {db,Enum,General} = require('../utils');
const {config} = require ('../config');

var Distance="";
var Temperature="";
var Humidity="";
var Paused= false;
var Cancelled = false;
var Restarted = false;
const delay = ms => new Promise(res => setTimeout(res, ms));

//get messages from main thread
parentPort.on("message", (value)=>{
    
    if(value.MessageType==="Data"){
        if(value.Name==="Distance"){
            Distance = value.Value;
        }
        else if(value.Name==="Temperature"){
            Temperature = value.Value;
        }
        else if(value.Name==="Humidity"){
            Humidity = value.Value;
        }
        else if(value.Name==="Paused"){
            log("got message :" + value.Name);
            Paused = value.Value;
        }
        else if(value.Name==="Cancelled"){
            log("got message :" + value.Name);
            Cancelled = value.Value;
        }
        else if(value.Name==="Running"){
            log("got message :" + value.Name);
            Restarted = value.Value;
        }
    }
});

(async () => {
    var Completed = false;
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

    var currentDoughVolume = undefined;
    var currentDoughVolumes = [];
    var currentDoughHeight = undefined;
    var currentDoughHeights= [];

    var targetVolume = undefined;
    var targetDoughHeight = undefined;
    var targetHeight = undefined;

    var containerHeight = undefined;
    var containerSurface = undefined;
    var containerVolume = undefined;
    
    var startTemp = undefined;
    var currentTemp = undefined;
    var targetTemp = undefined;

    var jobProgramID=undefined;

    var tmpDoughHeight= 0;
    var tmpDoughVolume= 0;

    var index = 0;

    var jobData= {
        Name: "",
        StartTime : "",
        StartTemperature : "",
        StartDoughHeight : "",
        StartDoughVolume : "",
        EndTime : "",
        EndTemperature : "",
        EndDoughHeight : "",
        EndDoughVolume : "",
        Cycles: [],
        ElapsedTime:""
    };

    var cycle= { 
        Id: 0,      
        TargetTemperature: "",
        Type: "",
        StartTime : "",
        StartTemperature : "",
        StartDoughHeight : "",
        StartDoughVolume : "",
        EndTime : "",
        EndTemperature : "",
        EndDoughHeight : "",
        EndDoughVolume : "",
        ElapsedTime :""
    };

    var currentData={
        CycleID:"",
        DateTime:"",
        Temperature: "",
        Humidity: "",
        DoughHeight: "",
        DoughVolume: ""
    };

    if(parentPort === undefined) process.exit(0); 

    try{
        //check if there is a program to run
        var queuedProgram=db.GetJob(Enum.JOBSTATUS.QUEUED,Enum.JOBTYPE.PROGRAM);

        if(queuedProgram.data===undefined) parentPort.postMessage('done');


        log("Job Program Started on "+ Date());
        jobProgramID=queuedProgram.data.ID;
        db.UpdateJobStatus(jobProgramID,Enum.JOBSTATUS.RUNNING);
        log("ScheduledID: "+ jobProgramID);
        log("ProgramID: "+ queuedProgram.data.PROGRAMID);
        var program = db.GetProgram(queuedProgram.data.PROGRAMID);

        var programdata= JSON.parse(program.data.DATA);

        containerHeight = programdata.Height;
        containerSurface = programdata.Width * programdata.Length;
        containerVolume = containerSurface * containerHeight;
        log("Container Volumer: "+ containerVolume);

        if(programdata.Cycles.length===0) parentPort.postMessage('done');
 
        while(!Completed){
            //every 1s while there is a program running
            //do stuff

            if(Cancelled){
                //the job is cancelled will exit
                sendData("jobCancelled", "true");
                log("Job Program Cancelled by user on "+ Date());
                Completed=true;
                parentPort.postMessage('done');
            }

            if(Paused){
                //the Job is Paused we wait until it will be resume
                log("Job Program Paused");
                if(Restarted) {
                    log("Job Program Restarted");
                    Paused= false;
                }
                await delay(100);
            }

            if(!Paused && !Cancelled){
                //send a request to the main thread to get distance and temp
                request("GetDistance");
                request("GetTemperature");
                request("GetHumidity");

                await delay(100);
                index++;

                if(cycleIndex >= programdata.Cycles.length){
                    //There are no more Cycles available,
                    //We have completed the program
                    Completed = true;

                    jobData.EndTime= Date.now();
                    jobData.EndTemperature= Temperature;
                    jobData.EndDoughHeight= currentDoughHeight;
                    jobData.EndDoughVolume= currentDoughVolume;
                    jobData.ElapsedTime= jobData.EndTime - jobData.StartTime

                    jobData.Cycles[cycleIndex-1].EndTime = currentTime;
                    jobData.Cycles[cycleIndex-1].EndTemperature = Temperature;
                    jobData.Cycles[cycleIndex-1].EndDoughHeight = currentDoughHeight;
                    jobData.Cycles[cycleIndex-1].EndDoughVolume = currentDoughVolume;
                    jobData.Cycles[cycleIndex-1].ElapsedTime= jobData.Cycles[cycleIndex-1].EndTime - jobData.Cycles[cycleIndex-1].StartTime;
                }
                else{
                    if(firstCycle || cycleCompleted){
                        // We've completed a cycle or it is the first cycle so now we need to
                        // initialized the variables for the cycle

                        sendData("cycleCompleted", "true");
                        firstCycle = false;
                        cycleCompleted = false;

                        startTime = Date.now();
                        //sendData("startTime", startTime);
                        startTemp = Temperature; 
                        //sendData("startTemperature", startTemp);
                        startDoughHeight= (containerHeight - Distance).toFixed(2);
                        //sendData("startDoughHeight", startDoughHeight);
                        startDoughVolume = (containerSurface * startDoughHeight).toFixed(2);
                        //sendData("startDoughVolume", startDoughVolume);

                        if(cycleIndex===0){
                            jobData.Name= program.data.NAME;
                            jobData.StartTime= startTime;
                            jobData.StartTemperature= Temperature;
                            jobData.StartDoughHeight= startDoughHeight;
                            jobData.StartDoughVolume= startDoughVolume;

                            for(const c of programdata.Cycles){
                                cycle.Id= c.Id;
                                cycle.TargetTemperature= Number(c.Temperature);
                                cycle.Type= c.End.Type;
                                //deep copy of cycle object
                                jobData.Cycles.push(JSON.parse(JSON.stringify(cycle)));
                            }
                        }
                        else{
                            jobData.Cycles[cycleIndex-1].EndTime = currentTime;
                            jobData.Cycles[cycleIndex-1].EndTemperature = Temperature;
                            jobData.Cycles[cycleIndex-1].EndDoughHeight = currentDoughHeight;
                            jobData.Cycles[cycleIndex-1].EndDoughVolume = currentDoughVolume;
                            jobData.Cycles[cycleIndex-1].ElapsedTime= jobData.Cycles[cycleIndex-1].EndTime - jobData.Cycles[cycleIndex-1].StartTime;
                        }
                        
                        jobData.Cycles[cycleIndex].StartTime = startTime;
                        jobData.Cycles[cycleIndex].StartTemperature = Temperature;
                        jobData.Cycles[cycleIndex].StartDoughHeight = startDoughHeight;
                        jobData.Cycles[cycleIndex].StartDoughVolume = startDoughVolume;

                        var ret=db.UpdateJobData(queuedProgram.data.ID,jobData);

                        endCycle = programdata.Cycles[cycleIndex].End;
                        log("Cycle Index: " + cycleIndex);
                        log("End Type: " + endCycle.Type);
                        if(endCycle.Type === "Duration")
                        {
                            targetEndTime = (Number(endCycle.Value)*60000); //Duration is expressed in minutes
                            log("targetEndTime: " + Math.round(targetEndTime / 60000) + " minutes");
                        }
                        else if(endCycle.Type==="Volume"){
                            targetHeight = Number(endCycle.Value) * startDoughHeight;
                            log("targetHeight: " + targetHeight);
                            targetVolume = Number(endCycle.Value) * startDoughVolume;
                            log("targetVolume: " + targetVolume);
                        }

                        targetTemp = Number(programdata.Cycles[cycleIndex].Temperature);
                        log("targetTemp: " + targetTemp);
                    }

                    currentTemp = Temperature;
                    tmpDoughHeight = (containerHeight - Distance).toFixed(2);
                    currentDoughHeights.push(tmpDoughHeight);
                    tmpDoughVolume = (containerSurface * tmpDoughHeight).toFixed(2);
                    currentDoughVolumes.push(tmpDoughVolume);
                    currentTime = Date.now();

                    elapsedTime = currentTime - startTime;

                    //every 30 seconds
                    //if(Math.floor((elapsedTime % 60000)/1000)===0){
                    if(index>300 || Restarted){
                        index=0;
                        Restarted= false;
                        //Dough volume
                        currentDoughVolumes= General.removeNAN(currentDoughVolumes);
                        log("currentVolumes length: " + currentDoughVolumes.length);
                        tmpDoughVolume= General.Median(currentDoughVolumes);
                        if(tmpDoughVolume!=NaN){
                            currentDoughVolume= tmpDoughVolume;
                        }

                        //dough height
                        currentDoughHeights= General.removeNAN(currentDoughHeights);
                        log("currentDoughHeights length: " + currentDoughHeights.length);
                        tmpDoughHeight= General.Median(currentDoughHeights);
                        if(tmpDoughHeight!=NaN){
                            currentDoughHeight= tmpDoughHeight;
                        }

                        currentDoughVolumes= [];
                        currentDoughHeights= [];

                        currentData.CycleID= cycleIndex;
                        currentData.DateTime= currentTime;
                        currentData.Humidity= Humidity;
                        currentData.Temperature= currentTemp;
                        currentData.DoughHeight= currentDoughHeight;
                        currentData.DoughVolume= currentDoughVolume;

                        //send data 
                        log("Elpsed Time = " + elapsedTime + " milliseconds" );
                        log("Elpsed Time = " + Math.round(elapsedTime/60000) + " minutes" );
                        
                        db.AddJobLog(queuedProgram.data.ID,JSON.stringify(currentData));
                        sendData("currentData", currentData);

                        //check if cycle is completed
                        if(endCycle.Type==="Duration"){
                            if(elapsedTime>targetEndTime){
                                log("minutes elapsed: "+ Math.round(elapsedTime/60000));
                                cycleCompleted=true;
                                cycleIndex++;
                            }
                        }
                        else if(endCycle.Type==="Volume"){
                            if(currentDoughVolume>= targetVolume){
                                
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
            }
        }

        var ret=db.UpdateJobData(queuedProgram.data.ID,jobData);
        var ret=db.UpdateJobStatus(queuedProgram.data.ID,Enum.JOBSTATUS.COMPLETED);
        

        if(config().EMAIL_NOTIFY){
            var emaildata={ 
                subject:"",
                body: ""
            };
            emaildata.subject = "Job for Program: " + jobData.Name + " Completed!"
            emaildata.body = transformJsonDataToHtml(jobData);
            var ret= db.AddJobEmail(JSON.stringify(emaildata));
        }

        if(ret.error){
            sendData("jobError", ret.message);
            error(ret.message);
            process.exit(1);
        }

        sendData("jobCompleted", "true");
        log("Job Program Completed on "+ Date());
        


        //we have completed the job
        parentPort.postMessage('done');
    }
    catch(err){
        log("Job Program Error: "+ err);
        sendData("jobError", err);
        var ret=db.UpdateJobStatus(jobProgramID,Enum.JOBSTATUS.FAILED);
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

function transformJsonDataToHtml(jsonData){
    var retstring="";

    retstring+="<table style='width:100%; border:1px solid ; border-collapse: collapse'>";

    retstring+="<tr style='border:1px solid ; border-collapse: collapse; background-color: #dddddd'>";
    retstring+="<th colSpan='4'>Program report</th>" ;
    retstring+="</tr>";

    retstring+="<tr style='border:1px solid ; border-collapse: collapse'>";
    retstring+="<th>Name</th>" ;
    retstring+="<td colSpan='3'>" + jsonData.Name + "</td>";
    retstring+="</tr>";

    retstring+="<tr style='border-top:1px solid ; border-collapse: collapse'>";
    retstring+="<th rowSpan='4'>Start</th>" ;
    retstring+="<td>Time</td>";
    retstring+="<td colSpan='2'>" + General.DateTimeToString(jsonData.StartTime) +"" + "</td>";
    retstring+="</tr>";

    retstring+="<tr>";
    retstring+="<td>Temperature</td>" ;
    retstring+="<td colSpan='2'>" + jsonData.StartTemperature + "</td>";
    retstring+="</tr>";

    retstring+="<tr>";
    retstring+="<td>DoughHeight</td>" ;
    retstring+="<td colSpan='2'>" + jsonData.StartDoughHeight + "</td>";
    retstring+="</tr>";

    retstring+="<tr>";
    retstring+="<td>DoughVolume</td>" ;
    retstring+="<td colSpan='2'>" + jsonData.StartDoughVolume + "</td>";
    retstring+="</tr>";

    retstring+="<tr style='border-top:1px solid ; border-collapse: collapse'>";
    retstring+="<th rowSpan='4'>End</th>" ;
    retstring+="<td>Time</td>" ;
    retstring+="<td colSpan='2'>" + General.DateTimeToString(jsonData.EndTime) + "</td>";
    retstring+="</tr>";

    retstring+="<tr >";
    retstring+="<td>Temperature</td>" ;
    retstring+="<td colSpan='2'>" + jsonData.EndTemperature + "</td>";
    retstring+="</tr>";

    retstring+="<tr>";
    retstring+="<td>DoughHeight</td>" ;
    retstring+="<td colSpan='2'>" + jsonData.EndDoughHeight + "</td>";
    retstring+="</tr>";

    retstring+="<tr>";
    retstring+="<td>DoughVolume</td>" ;
    retstring+="<td colSpan='2'>" + jsonData.EndDoughVolume + "</td>";
    retstring+="</tr>";

    retstring+="<tr style='border:1px solid ; border-collapse: collapse'>";
    retstring+="<th>ElapsedTime</th>" ;
    retstring+="<td colSpan='3'>" + General.ElapsedTime(jsonData.ElapsedTime) + "</td>";
    retstring+="</tr>";

    retstring+="<tr style='border:1px solid ; border-collapse: collapse; background-color: #dddddd'>";
    retstring+="<th colSpan='4'>Cycles</th>" ;
    retstring+="</tr>";
    jsonData.Cycles.forEach(cycle => {
        retstring+="<tr style='border:1px solid ; border-collapse: collapse'>";
        retstring+="<th rowSpan='12'>Cycle " + cycle.Id + "</th>" ;
        // retstring+="<td colSpan='2'>" + cycle.Id + "</td>";
        retstring+="</tr>";

        retstring+="<tr style='border:1px solid ; border-collapse: collapse'>";
        retstring+="<th style='border-left:1px solid ; border-collapse: collapse'>Target Temperature</th>" ;
        retstring+="<td colSpan='2'>" + cycle.TargetTemperature + "</td>";
        retstring+="</tr>";

        retstring+="<tr style='border:1px solid ; border-collapse: collapse'>";
        retstring+="<th style='border-left:1px solid ; border-collapse: collapse'>Type</th>" ;
        retstring+="<td colSpan='2'>" + cycle.Type + "</td>";
        retstring+="</tr>";

        retstring+="<tr style='border-top:1px solid ; border-collapse: collapse'>";
        retstring+="<th rowSpan='4' style='border-left:1px solid ; border-collapse: collapse'>Start</th>" ;
        retstring+="<td>Time</td>";
        retstring+="<td>" + General.DateTimeToString(cycle.StartTime) +"" + "</td>";
        retstring+="</tr>";

        retstring+="<tr>";
        retstring+="<td>Temperature</td>" ;
        retstring+="<td>" + cycle.StartTemperature + "</td>";
        retstring+="</tr>";
    
        retstring+="<tr>";
        retstring+="<td>DoughHeight</td>" ;
        retstring+="<td>" + cycle.StartDoughHeight + "</td>";
        retstring+="</tr>";
    
        retstring+="<tr>";
        retstring+="<td>DoughVolume</td>" ;
        retstring+="<td>" + cycle.StartDoughVolume + "</td>";
        retstring+="</tr>";

        retstring+="<tr style='border-top:1px solid ; border-collapse: collapse'>";
        retstring+="<th rowSpan='4' style='border-left:1px solid ; border-collapse: collapse'>End</th>" ;
        retstring+="<td>Time</td>" ;
        retstring+="<td>" + General.DateTimeToString(cycle.EndTime) + "</td>";
        retstring+="</tr>";

        retstring+="<tr >";
        retstring+="<td>Temperature</td>" ;
        retstring+="<td>" + cycle.EndTemperature + "</td>";
        retstring+="</tr>";

        retstring+="<tr>";
        retstring+="<td>DoughHeight</td>" ;
        retstring+="<td>" + cycle.EndDoughHeight + "</td>";
        retstring+="</tr>";

        retstring+="<tr>";
        retstring+="<td>DoughVolume</td>" ;
        retstring+="<td>" + cycle.EndDoughVolume + "</td>";
        retstring+="</tr>";

        retstring+="<tr style='border:1px solid ; border-collapse: collapse'>";
        retstring+="<th style='border-left:1px solid ; border-collapse: collapse'>ElapsedTime</th>" ;
        retstring+="<td colSpan='2'>" + General.ElapsedTime(cycle.ElapsedTime) + "</td>";
        retstring+="</tr>";
    });
    

    retstring+="</table>";


    return retstring;
}