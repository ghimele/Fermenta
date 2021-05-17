const {utilfs} = require('../utils');
const config = require('./config');
const path = require("path");

function SaveData(){
    const data={
        "LANGUAGE": config().LANGUAGE,
        "EMAIL_NOTIFY": config().EMAIL_NOTIFY,
        "EMAIL_TO": config().EMAIL_TO,
        "TEMPERATURE_HYSTERESIS": config().TEMPERATURE_HYSTERESIS
    };

    utilfs.WriteFile(path.join(__dirname,'config.json'), JSON.stringify(data));
}

const utils={
    SaveData: SaveData
}

module.exports = utils; 