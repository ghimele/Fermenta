var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var helmet = require ('helmet');
var log4js = require ('log4js');
var indexRouter = require('./routes/index');
//var utils = require('./utils/index');

var log = log4js.getLogger("backend");

var app = express();
env = app.get('env')

app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


app.use('/api', indexRouter);

console.log("Environment: %s", process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
    
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    // Handle React routing, return all requests to React app
    app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    });
}



module.exports = app;
