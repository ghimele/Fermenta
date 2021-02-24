var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var utils = require('./utils/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use('/api', indexRouter);

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


utils.db.UpdateMainDB(function(mess,err){
    if(err) 
        console.log("%s - %s",mess, err);

});

module.exports = app;
