const { parentPort } = require('worker_threads');
const {db,Enum,General,Email} = require('../utils');
const {config} = require ('../config');

var Cancelled = false;
var jobEmailID;
var Completed = false;
var emailData;
const delay = ms => new Promise(res => setTimeout(res, ms));

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
        var queuedEmail=db.GetJob(Enum.JOBSTATUS.QUEUED,Enum.JOBTYPE.EMAIL);

        if(queuedEmail.data===undefined) parentPort.postMessage('done');

        log("Job Email Started on "+ Date());
        jobEmailID=queuedEmail.data.ID;

        db.UpdateJobStatus(jobEmailID,Enum.JOBSTATUS.RUNNING);

        emailData=JSON.parse(queuedEmail.data.DATA);
        log("Email Data: "+ JSON.stringify(emailData));

        if(Cancelled){
            //the job is cancelled will exit
            sendData("jobCancelled", "true");
            log("Job Email Cancelled by user on "+ Date());
            Completed=true;
            parentPort.postMessage('done');
        }

        //send email
        log("Job Email subject: "+ emailData.subject);
        log("Job Email body: "+ emailData.body);
        await Email.sendEmail(emailData.subject, emailData.body,config().EMAIL_TO);
        
        // html: '<h1>Example HTML Message Body</h1>'
        var ret=db.UpdateJobStatus(queuedEmail.data.ID,Enum.JOBSTATUS.COMPLETED);
        
        if(ret.error){
            sendData("jobError", ret.message);
            error(ret.message);
            process.exit(1);
        }

        sendData("jobCompleted", "true");
        log("Job Email Completed on "+ Date());
        
        //we have completed the job
        parentPort.postMessage('done');
    }
    catch(err){
        log("Job Email Error: "+ err);
        sendData("jobError", err);
        var ret=db.UpdateJobStatus(jobEmailID,Enum.JOBSTATUS.FAILED);
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