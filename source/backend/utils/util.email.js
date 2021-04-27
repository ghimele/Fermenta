const nodemailer = require("nodemailer");
const config = require('../config/config');
var log4js = require('log4js');
var log = log4js.getLogger("util.email");

const transporter = nodemailer.createTransport({
    host: config().EMAIL_HOST,
    port: config().EMAIL_PORT,
    secure: config().EMAIL_SECURE,
    auth: {
        user: config().EMAIL_USER,
        pass: config().EMAIL_PASSWORD
    }
});


async  function sendEmail(subject, body, to){
    log.info("sendEmail");
    var email_to= to;

    if(to===undefined){
        email_to= config().EMAIL_TO;
    }

    try{
        
        var info= await transporter.sendMail({
            from: config().EMAIL_FROM,
            to: to,
            subject: subject,
            html: body
        });

        log.info("Message sent: " + info.messageId);
        console.log("Message sent: " + info.messageId);
    }
    catch(err){
        console.error("Error during DeleteProgram: " + err);
        log.error("Error during DeleteProgram: " + err);
        throw err;
    }
}

const Email ={
    sendEmail: sendEmail
}

module.exports = Email;