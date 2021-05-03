var utils = require('../utils');
var config = require('../config');
var log = require('log4js').getLogger("mid.programs");
// ********************
// Programs API - start
// ********************

const getPrograms = (req, res, next) => {
    var ret;
    ret = utils.db.GetPrograms();

    if (ret.error) {
        return res.status(400).json({
          error: true,
          message: ret.message
        });
    } else {
        req.data = ret.data;
        next();
    }
};

const updateProgram = (req,res,next)=>{
    var ret;
    ret = utils.db.UpdateProgram(req.params.id, req.body);

    if (ret.error) {
        return res.status(400).json({
          error: true,
          message: ret.message
        });
    } else {
        req.message = ret.message;
        next();
    }
}


const createProgram = (req,res,next)=>{
    var ret;
    ret = utils.db.AddProgram(req.body);

    if (ret.error) {
        return res.status(400).json({
          error: true,
          message: ret.message
        });
    } else {
        req.message = ret.message;
        next();
    }
}

const deleteProgram = (req,res,next)=>{
    var ret;
    ret = utils.db.DeleteProgram(req.params.id);

    if (ret.error) {
        return res.status(400).json({
          error: true,
          message: ret.message
        });
    } else {
        req.message = ret.message;
        next();
    }
}

// ********************
// Programs API - end
// ********************

// ********************
// JOBS API - start
// ********************

const createJob= (req,res,next)=>{
    var ret;
    ret = utils.db.AddJob(req.params.programid);

    if (ret.error) {
        return res.status(400).json({
          error: true,
          message: ret.message
        });
    } else {
        req.message = ret.message;
        next();
    }
};

const getJob = (req, res, next) => {
    var ret;
    ret = utils.db.GetJob('','',req.params.id);

    if (ret.error) {
        return res.status(400).json({
          error: true,
          message: ret.message
        });
    } else {
        req.data = ret.data;
        next();
    }
};

const updateJob = (req,res,next)=>{
    var ret;
    var message= utils.DataType.Message;
    ret = utils.db.UpdateJobStatus(req.params.id, req.body.STATUS);

    if (ret.error) {
        return res.status(400).json({
          error: true,
          message: ret.message
        });
    }
    else {
        if(req.body.STATUS === utils.Enum.JOBSTATUS.PAUSED){
            message.MessageType="Data";
            message.Name = "Paused"
            message.Value = true;
            console.debug("send message: "+ JSON.stringify(message));
            utils.JobScheduler.PostMessage(utils.Enum.JOBTYPE.PROGRAM,message);
        }
        else if(req.body.STATUS === utils.Enum.JOBSTATUS.CANCELLED){
            message.MessageType="Data";
            message.Name = "Cancelled"
            message.Value = true;
            utils.JobScheduler.PostMessage(utils.Enum.JOBTYPE.PROGRAM,message);
        }
        else if(req.body.STATUS === utils.Enum.JOBSTATUS.RUNNING){
            message.MessageType="Data";
            message.Name = "Running";
            message.Value = true;
            utils.JobScheduler.PostMessage(utils.Enum.JOBTYPE.PROGRAM,message);
        }
        
        req.message = ret.message;
        next();
    }
}

const getJobs = (req, res, next) => {
    var ret;
    ret = utils.db.GetJobs();

    if (ret.error) {
        return res.status(400).json({
          error: true,
          message: ret.message
        });
    } else {
        req.data = ret.data;
        next();
    }
};


const getRunningJobProgram = (req, res, next) => {
    var ret;
    ret = utils.db.GetJob(utils.Enum.JOBSTATUS.RUNNING,utils.Enum.JOBTYPE.PROGRAM);

    if (ret.error) {
        return res.status(400).json({
          error: true,
          message: ret.message
        });
    } else {
        //to enable when we enable the PAUSE button in the interface
        // if(ret.data === undefined){
        //     ret = utils.db.GetJob(utils.Enum.JOBSTATUS.PAUSED,utils.Enum.JOBTYPE.PROGRAM);
        //     if(ret.error){
        //         return res.status(400).json({
        //             error: true,
        //             message: ret.message
        //           });
        //     }

        //     req.data = ret.data;
        // }
        // else{
        //     req.data = ret.data;
        // }
        req.data = ret.data;
        next();
    }
};

// ********************
// JOBS API - end
// ********************

// ********************
// JOB LOGS API - start
// ********************

const getJobLog = (req, res, next) => {
    var ret;
    ret = utils.db.GetJobLog(req.params.jobid);

    if (ret.error) {
        return res.status(400).json({
          error: true,
          message: ret.message
        });
    } else {
        req.data = ret.data;
        next();
    }
};

// ********************
// JOB LOGS API - end
// ********************


// ********************
// SETTINGS API - start
// ********************
const getSettings = (req, res, next) => {

    var data={
        "EMAIL_TO": config.config().EMAIL_TO,
        "EMAIL_NOTIFY": config.config().EMAIL_NOTIFY,
        "LANGUAGE": config.config().LANGUAGE
    };

    log.debug("getSettings: " + data);
    req.data = data;
    next();
    
};


const updateSettings = (req,res,next)=>{
    log.debug("updateSettings - body: " + JSON.stringify(req.body));
    config.config().EMAIL_TO= req.body.EMAIL_TO;
    config.config().EMAIL_NOTIFY= req.body.EMAIL_NOTIFY;
    config.config().LANGUAGE= req.body.LANGUAGE;

    config.utils.SaveData();
    log.debug(config.config());
    req.message = 'updated';
    next();
}


// ********************
// SETTINGS API - end
// ********************


const programs = {
    //Programs Api
    getPrograms: getPrograms,
    updateProgram: updateProgram,
    createProgram: createProgram,
    deleteProgram: deleteProgram,
    //JOB Api
    createJob: createJob,
    getJob: getJob,
    getJobs: getJobs,
    updateJob: updateJob,
    getRunningProgram: getRunningJobProgram,
    //JOB Log Api
    getJobLog: getJobLog,
    //Settings Api
    getSettings: getSettings,
    updateSettings: updateSettings
};

module.exports = programs;