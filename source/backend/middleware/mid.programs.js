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

const programs = {
    getPrograms: getPrograms,
    updateProgram: updateProgram
};

module.exports = programs;