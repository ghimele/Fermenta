const fs = require("fs");
var log = require('log4js').getLogger("util.fs");

// Create a folder if it doesn't exists
function CreateFolder(path, mask, cb) {
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, { recursive: true , mode: mask}, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } 
        else{
          cb(null); // successfully created folder
        }
    });
}

function WriteFile(filepath,data){
    console.log("WriteFile: " + filepath);
    fs.writeFile(filepath, data, 'utf8', function (err) {
        if (err) {
            log.error("An error occured while writing file: " + err);
            return console.log(err);
        }
    
        log.debug("file: " + filepath + " has been saved.");
    });
}

const utilfs = {
    CreateFolder: CreateFolder,
    WriteFile: WriteFile
};

module.exports = utilfs;