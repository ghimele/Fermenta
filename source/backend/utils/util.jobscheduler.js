const Bree = require('bree');
const MQTTClient = require('./util.mqttclient');
const Message = require('./util.message');
var log4js = require('log4js');
var joblog = log4js.getLogger('job');

var bree = undefined;
var programData=[];

function start(){
    if(bree===undefined){
        bree = new Bree({logger: joblog,
                    workerMessageHandler: handleWorkerMessage
                    });

        bree.start();

        bree.on('worker created', name=>{
            if(name==="program"){
            }
        });
    }
}

//Get messages from the worker thread
function handleWorkerMessage(metadata){
    var worker;
    var outmess = {
        MessageType : "Data",
        Name : "",
        Value : ""
    };

    worker = bree.workers[metadata.name];

    const inmess = metadata.message;

    if(inmess.MessageType==="Log"){
        joblog.info(inmess.Value);
    }
    else if(inmess.MessageType==="Error"){
        joblog.error(inmess.Value);
    }

    if(metadata.name==="program"){
        // we got a message from Job program
        if(inmess.MessageType==="Request"){
            if(inmess.Value==="GetDistance"){
                outmess.Name="Distance";
                outmess.Value=MQTTClient.getDistance();
                worker.postMessage(outmess);
            }
            else if(inmess.Value==="GetTemperature"){
                outmess.Name="Temperature";
                outmess.Value=MQTTClient.getTemperature();
                worker.postMessage(outmess);
            }
        }
        else if(inmess.MessageType==="Data"){
            data=new ProgramData(inmess.Name,inmess.Value);
            joblog.info("Data: %s = %s",inmess.Name, inmess.Value);
            programData[inmess.Name]=data;
            programData.push(data);
            //joblog.info("programData length: %d", programData.length);
            //joblog.info("Data: %s", JSON.stringify(programData));
        }
    }
}

function ProgramData(name,value){
    Name=name;
    Value=value;
}

const JobScheduler = {
    start: start
};

module.exports = JobScheduler;


