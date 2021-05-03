const dotenv = require("dotenv").config();

// const opts = {}
// if (fs.existsSync('.env-local')) {
//   opts.path = '.env-local' 
// }

// dotenv.config(opts)

//satic data to don't have to generate the conf_adata 2 times
var config_data = null

const Data = () =>{
    if(config_data != null && config_data != undefined) {
        return config_data;
    }

    config_data = {}
    //LOAD JSON
    // if(process.env.NODE_ENV === undefined || process.env.NODE_ENV == null || process.env.NODE_ENV == 'development') { 
    //     config_data = require('./config.development.json')
    // } else {
    // if(process.env.NODE_ENV == 'production') {
    //     config_data = require('./config.production.json')
    // }}
    config_data = require('./config.json');
    config_data.Log4js= require('./log4js.json');
    //LOAD FROM ENV VARIABLES
    config_data.PORT = process.env.port || 3000;
    config_data.EMAIL_HOST= process.env.EMAIL_HOST;
    config_data.EMAIL_PORT= process.env.EMAIL_PORT;
    config_data.EMAIL_SECURE= process.env.EMAIL_SECURE;
    config_data.EMAIL_USER= process.env.EMAIL_USER;
    config_data.EMAIL_PASSWORD= process.env.EMAIL_PASSWORD;
    config_data.EMAIL_FROM= process.env.EMAIL_FROM;
    return config_data;
 }

module.exports = Data; 



