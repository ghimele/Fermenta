var util = require("util");
var spawn = require('child_process').spawn;
var fs = require('fs');

var gpioCommand = __dirname + '/buzzer_player.py';

function playBuzzer(n) {
    var child = spawn(gpioCommand, [n]);
    var running = true;

    child.stdout.on('data', function(data) {
        console.log("out: " + data + " :");
    });

    child.stderr.on('data', function(data) {
        console.log("err: " + data + " :");
    });

    child.on('close', function(code) {
        console.log("ret: " + code + " :"); 
        child = null;
        running = false;
    });

    child.on('error', function(err) {
        if (err.errno === "ENOENT") { console.warn('Command not found'); }
        else if (err.errno === "EACCES") { console.warn('Command not executable'); }
        else { console.log('error: ' + err); }
    });
}


const buzzer={
    playBuzzer: playBuzzer
};

module.exports = buzzer;
