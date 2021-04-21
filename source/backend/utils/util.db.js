const path = require("path");
const fs = require("fs");
const { version } = require('../package.json');
const utilgeneral = require('./util.general');
const sqliteDB = require('better-sqlite3');
var log4js = require('log4js');
var log = log4js.getLogger("util.db");
const Enum = require('./util.enum');
const maindbPath=path.join(__dirname,'..','database', 'main.db');

//{ verbose: log.log }
const maindb= new sqliteDB(maindbPath);

function errorCB(err,data){
    if(err){
        console.log("Error: %s", err)
        log.error("Error: ",data, err);
    }
    return "";
}

function UpdateMainDB(){
    const SELECT_VERSION = maindb.prepare('SELECT * FROM VERSION WHERE ID=1');
    try{
            log.info("Main DB path: %s", maindb);
            log.info("Version: %s", version);
            const curr_version=SELECT_VERSION.get();
            log.info("Current Version: %s", curr_version);
            if(curr_version.VERSION!=version){

                switch (curr_version.VERSION){
                        case '0.0.0':
                            updateMainDBTo0_1_0();
                            updateMainDBTo0_2_0();
                        case '0.1.0':
                            updateMainDBTo0_2_0();
                }
                updateVersion(version);
            }
    }
    catch(err){
        log.error("Error during UpdateMainDB: %s", err);
        throw(err);
    }
}

function updateMainDBTo0_1_0(){
    log.info('updateMainDBTo0_1_0');
    try{
        const Transaction = maindb.transaction(() => {
            const CREATE_TABLE_PROGRAM = maindb.prepare('CREATE TABLE IF NOT EXISTS PROGRAM (ID INTEGER NOT NULL UNIQUE, NAME TEXT NOT NULL, DATA JSON, PRIMARY KEY("ID" AUTOINCREMENT))');
            CREATE_TABLE_PROGRAM.run();
        });

        Transaction.apply();
    }
    catch(err){
        log.error("Error during updateMainDBTo0_1_0: %s", err);
        throw(err);
    }
}

function updateMainDBTo0_2_0(){
    log.info('updateMainDBTo0_2_0');
    try{
        const Transaction = maindb.transaction(() => {
            const CREATE_TABLE_JOB = maindb.prepare('CREATE TABLE IF NOT EXISTS JOB (ID INTEGER NOT NULL UNIQUE, NAME TEXT NOT NULL, STATUS TEXT NOT NULL, ARRIVALDATE DATE, STARTDATE DATE, ENDDATE DATE, JOBTYPE TEXT NOT NULL, PROGRAMID NUMBER, PRIMARY KEY(ID AUTOINCREMENT))');
            CREATE_TABLE_JOB.run();

            const CREATE_TABLE_JOBLOG = maindb.prepare('CREATE TABLE IF NOT EXISTS JOBLOG (ID INTEGER, JOBID INTEGER NOT NULL, DATA JSON, PRIMARY KEY(ID))');
            CREATE_TABLE_JOBLOG.run();
        });

        Transaction.apply();
    }
    catch(err){
        log.error("Error during updateMainDBTo0_2_0: %s", err);
        throw(err);
    }
}

function updateVersion(version){
    const UPDATE_TABLE_VERSION = maindb.prepare('UPDATE VERSION SET VERSION = ? WHERE ID = 1');
    try{
        log.info('updateVersion');
        const Transaction = maindb.transaction(() => {
        UPDATE_TABLE_VERSION.run(version);
        });
        Transaction.apply();
    }
    catch(err){
        log.error("Error during updateVersion: %s", err);
        throw(err);
    }
}

function GetPrograms(){
    const SELECT_PROGRAMS = maindb.prepare('SELECT * FROM PROGRAM');
    var retval= new Object();
    retval.error=false;
    retval.message="";
    retval.data=null;

    var data;
    try{
        log.info('GetPrograms');
        data=SELECT_PROGRAMS.all();
        for(const i in data){
            if(data[i].DATA!=null){
                data[i].DATA=JSON.parse(data[i].DATA);
            }
        }
        log.info(data);
        retval.data=data;
        return retval;
    }
    catch(err){
        log.error("Error during GetPrograms: %s", err);
        retval.error=true;
        retval.message=err.message;
        return retval;
    }
}

function UpdateProgram(ID, DATA){
    const UPDATE_PROGRAM = maindb.prepare('UPDATE PROGRAM SET NAME=?, DATA=? WHERE ID = ?');
    var retval= new Object();
    retval.error=false;
    retval.message="";
    try{
        log.info('UpdateProgram');
        log.info("got ID: %d", ID);
        log.info("got DATA: %s", JSON.stringify(DATA.DATA));

        if(utilgeneral.isEmpty(ID)){
            retval.error=true;
            retval.message="ID must not be empty";
            return retval;
        }
        
        const Transaction = maindb.transaction(() => {
            retval.message=UPDATE_PROGRAM.run(DATA.NAME,JSON.stringify(DATA.DATA),ID);
        });

        Transaction.apply();

        log.info(retval);
        return retval;
    }
    catch(err){
        log.error("Error during UpdateProgram: %s", err);
        retval.error=true;
        retval.message=err.message;
        return retval;
    }
}

function AddProgram(DATA){
    const INSERT_PROGRAM = maindb.prepare('INSERT INTO PROGRAM (NAME,DATA) VALUES(?,?)');
    var retval= new Object();
    retval.error=false;
    retval.message="";
    try{
        log.info('AddProgram');
        log.info("got DATA: %s", JSON.stringify(DATA.DATA));
        const Transaction = maindb.transaction(() => {
            retval.message=INSERT_PROGRAM.run(DATA.NAME,JSON.stringify(DATA.DATA));
        });

        Transaction.apply();

        log.info(retval);
        return retval;
    }
    catch(err){
        log.error("Error during AddProgram: %s", err);
        retval.error=true;
        retval.message=err.message;
        return retval;
    }
}

function DeleteProgram(ID){
    const DELETE_PROGRAM = maindb.prepare('DELETE FROM PROGRAM WHERE ID = ?');
    var retval= new Object();
    retval.error=false;
    retval.message="";
    try{
        log.info('DeleteProgram');
        
        if(utilgeneral.isEmpty(ID)){
            retval.error=true;
            retval.message="ID must not be empty";
            return retval;
        }

        const Transaction = maindb.transaction(() => {
            retval.message=DELETE_PROGRAM.run(ID);
        });

        Transaction.apply();

        log.info(retval);
        return retval;
    }
    catch(err){
        log.error("Error during DeleteProgram: %s", err);
        retval.error=true;
        retval.message=err.message;
        return retval;
    }
}

function GetJob(JOBSTATUS,JOBTYPE,ID=''){
    const SELECT_JOB_STATUS = maindb.prepare("SELECT * FROM JOB WHERE STATUS = ? and JOBTYPE=?");
    const SELECT_JOB = maindb.prepare("SELECT * FROM JOB WHERE ID = ?");
    var retval= new Object();
    retval.error=false;
    retval.message="";
    retval.data=null;

    var data;
    try{
        log.info('GetJob');
        if(ID!==''){
            data=SELECT_JOB.get(ID);
        }
        else{
            data=SELECT_JOB_STATUS.get(JOBSTATUS,JOBTYPE);
        }
        
        log.info(data);
        retval.data=data;
        return retval;
    }
    catch(err){
        log.error("Error during GetJob: %s", err);
        retval.error=true;
        retval.message=err.message;
        return retval;
    }
}

function GetJobs(){
    const SELECT_JOBS = maindb.prepare('SELECT * FROM JOB');
    var retval= new Object();
    retval.error=false;
    retval.message="";
    retval.data=null;

    var data;
    try{
        log.info('GetJobs');
        data=SELECT_JOBS.all();
        for(const i in data){
            if(data[i].DATA!=null){
                data[i].DATA=JSON.parse(data[i].DATA);
            }
        }
        log.info(data);
        retval.data=data;
        return retval;
    }
    catch(err){
        log.error("Error during GetJobs: %s", err);
        retval.error=true;
        retval.message=err.message;
        return retval;
    }
}

function GetProgram(ID){
    const SELECT_PROGRAM = maindb.prepare('SELECT * FROM PROGRAM WHERE ID = ?');
    var retval= new Object();
    retval.error=false;
    retval.message="";
    retval.data=null;

    var data;
    try{
        log.info('GetProgram');
        
        data=SELECT_PROGRAM.get(ID);
        for(const i in data){
            if(data[i].DATA!=null){
                data[i].DATA=JSON.parse(data[i].DATA);
            }
        }
        log.info(data);
        retval.data=data;
        return retval;
    }
    catch(err){
        log.error("Error during GetProgram: %s", err);
        retval.error=true;
        retval.message=err.message;
        return retval;
    }
}

function UpdateJobStatus(ID,STATUS){
    const UPDATE_JOB_STATUS = maindb.prepare("UPDATE JOB SET STATUS = ? WHERE ID = ?");
    const UPDATE_JOB_ARRIVALDATE = maindb.prepare("UPDATE JOB SET ARRIVALDATE = ? WHERE ID = ?");
    const UPDATE_JOB_STARTDATE = maindb.prepare("UPDATE JOB SET STARTDATE = ? WHERE ID = ?");
    const UPDATE_JOB_ENDDATE = maindb.prepare("UPDATE JOB SET ENDDATE = ? WHERE ID = ?");

    var retval= new Object();
    retval.error=false;
    retval.message="";
    try{
        log.info('UpdateJobStatus');
        log.info("got ID: %d", ID);

        if(utilgeneral.isEmpty(ID)){
            retval.error=true;
            retval.message="ID must not be empty";
            return retval;
        }

        if(utilgeneral.isEmpty(STATUS)){
            retval.error=true;
            retval.message="STATUS must not be empty";
            return retval;
        }
        const currdate=new Date().toLocaleString();
        const Transaction = maindb.transaction(() => {
            retval.message=UPDATE_JOB_STATUS.run(STATUS,ID);
            if(STATUS===Enum.JOBSTATUS.RUNNING){
                UPDATE_JOB_STARTDATE.run(currdate,ID);
            }
            else if(STATUS===Enum.JOBSTATUS.COMPLETED){
                UPDATE_JOB_ENDDATE.run(currdate,ID);
            }
        });

        Transaction.apply();

        log.info(retval);
        return retval;
    }
    catch(err){
        log.error("Error during UpdateJobStatus: %s", err);
        throw err.message;
    }
}

function UpdateJobData(ID,DATA){
    const UPDATE_JOB_DATA = maindb.prepare("UPDATE JOB SET DATA = ? WHERE ID = ?");

    var retval= new Object();
    retval.error=false;
    retval.message="";
    try{
        log.info('UpdateJobData');
        log.info("got ID: %d", ID);

        if(utilgeneral.isEmpty(ID)){
            retval.error=true;
            retval.message="ID must not be empty";
            return retval;
        }

        if(utilgeneral.isEmpty(JSON.stringify(DATA))){
            retval.error=true;
            retval.message="DATA must not be empty";
            return retval;
        }
        
        const Transaction = maindb.transaction(() => {
            retval.message=UPDATE_JOB_DATA.run(JSON.stringify(DATA),ID);
        });

        Transaction.apply();

        log.info(retval);
        return retval;
    }
    catch(err){
        log.error("Error during UpdateJobData: %s", err);
        throw err.message;
    }
}

function AddJob(PROGRAMID){
    const INSERT_JOB = maindb.prepare('INSERT INTO JOB (NAME,STATUS,ARRIVALDATE,JOBTYPE,PROGRAMID) VALUES(?,?,?,?,?)');
    var retval= new Object();
    retval.error=false;
    retval.message="";
    try{
        log.info('AddJob');
        log.info("got ProgramID: %s", JSON.stringify(PROGRAMID));
        const Transaction = maindb.transaction(() => {
            retval.message=INSERT_JOB.run("PROGRAM",Enum.JOBSTATUS.QUEUED,new Date().toLocaleString(),Enum.JOBTYPE.PROGRAM,PROGRAMID);
        });

        Transaction.apply();

        log.info(retval);
        return retval;
    }
    catch(err){
        log.error("Error during AddProgram: %s", err);
        retval.error=true;
        retval.message=err.message;
        return retval;
    }
}


function AddJobLog(JOBID,DATA){
    const INSERT_JOBLOG = maindb.prepare('INSERT INTO JOBLOG (JOBID,DATA) VALUES(?,?)');
    var retval= new Object();
    retval.error=false;
    retval.message="";
    try{
        log.info('AddJobLog');
        const Transaction = maindb.transaction(() => {
            retval.message=INSERT_JOBLOG.run(JOBID,DATA);
        });

        Transaction.apply();

        log.info(retval);
        return retval;
    }
    catch(err){
        log.error("Error during AddJobLog: %s", err);
        retval.error=true;
        retval.message=err.message;
        return retval;
    }
}

function GetJobLog(JOBID){
    const SELECT_JOB_LOG = maindb.prepare("SELECT * FROM JOBLOG WHERE JOBID = ?");
    var retval= new Object();
    retval.error=false;
    retval.message="";
    retval.data=null;

    var data;
    try{
        log.info('GetJobLog');
        data=SELECT_JOB_LOG.all(JOBID);
        log.info(data);
        for(const i in data){
            if(data[i].DATA!=null){
                data[i].DATA=JSON.parse(data[i].DATA);
            }
        }
        retval.data=data;
        return retval;
    }
    catch(err){
        log.error("Error during GetJobLog: %s", err);
        retval.error=true;
        retval.message=err.message;
        return retval;
    }
}

const db = {
    //Program functions
    UpdateMainDB: UpdateMainDB,
    GetPrograms: GetPrograms,
    UpdateProgram: UpdateProgram,
    AddProgram: AddProgram,
    DeleteProgram: DeleteProgram,
    //JOB functions
    GetJob: GetJob,
    GetProgram: GetProgram,
    UpdateJobStatus: UpdateJobStatus,
    AddJob: AddJob,
    UpdateJobData: UpdateJobData,
    GetJobs: GetJobs,
    //JOB Log functions
    AddJobLog: AddJobLog,
    GetJobLog: GetJobLog 
};

module.exports = db;