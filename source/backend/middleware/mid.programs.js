var utils = require('../utils');

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

const getScheduledProgram = (req, res, next) => {
    var ret;
    ret = utils.db.GetScheduledProgram();

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
const programs = {
    getPrograms: getPrograms,
    updateProgram: updateProgram,
    createProgram: createProgram,
    deleteProgram: deleteProgram,
    getScheduledProgram: getScheduledProgram
};

module.exports = programs;