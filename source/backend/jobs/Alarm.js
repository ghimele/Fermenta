const { parentPort } = require('worker_threads');
const {db,Enum} = require('../utils');
const {config} = require ('../config');
const driver = require('../driver/passivebuzzer');

var Cancelled = false;
var jobAlarmID;
var Completed = false;
var emailData;
const delay = ms => new Promise(res => setTimeout(res, ms));

//const playBuzzer = pin => new Promise(driver.playBuzzer(pin));

//get messages from main thread
parentPort.on("message", (value)=>{
    
    if(value.MessageType==="Data"){
        if(value.Name==="Cancelled"){
            log("got message :" + value.Name);
            Cancelled = value.Value;
        }
    }
});

(async () => {
    Completed = false;

    if(parentPort === undefined) process.exit(0); 

    try{
        await delay(5000);
        
        //check if there is a program to run
        var queuedAlarm=db.GetJob(Enum.JOBSTATUS.QUEUED,Enum.JOBTYPE.ALARM);

        if(queuedAlarm.data===undefined) parentPort.postMessage('done');

        log("Job Alarm Started on "+ Date());
        jobAlarmID=queuedAlarm.data.ID;

        db.UpdateJobStatus(jobAlarmID,Enum.JOBSTATUS.RUNNING);

        if(Cancelled){
            //the job is cancelled will exit
            sendData("jobCancelled", "true");
            log("Job Alarm Cancelled by user on "+ Date());
            Completed=true;
            parentPort.postMessage('done');
        }

        //start alarm
        var i=0;
        while(i<5){
            i++;
            log("alarm step: " + i);
            //driver.playBuzzer(config().BUZZER_PIN);
            //await playBuzzer(config().BUZZER_PIN);
            await delay(22000);
        }
        var ret=db.UpdateJobStatus(queuedAlarm.data.ID,Enum.JOBSTATUS.COMPLETED);
        
        if(ret.error){
            sendData("jobError", ret.message);
            error(ret.message);
            process.exit(1);
        }

        sendData("jobCompleted", "true");
        log("Job Alarm Completed on "+ Date());
        
        //we have completed the job
        parentPort.postMessage('done');
    }
    catch(err){
        log("Job Alarm Error: "+ err);
        sendData("jobError", err);
        var ret=db.UpdateJobStatus(jobAlarmID,Enum.JOBSTATUS.FAILED);
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