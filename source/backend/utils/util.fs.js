const fs = require("fs");

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

const utilfs = {
    CreateFolder: CreateFolder
};

module.exports = utilfs;