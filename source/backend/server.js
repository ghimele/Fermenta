/**
 * Module dependencies.
 */
var {config} = require('./config');

/**
 * Initialise log4js first, so we don't miss any log messages
 */
var log4js = require('log4js');
log4js.configure(config().Log4js);

var app = require('./app');
var debug = require('debug')('server:server');
var http = require('http');


const env = app.get('env');
const host = app.get('hostname');
var port = normalizePort(process.env.PORT || '3000');

const {MQTTClient,JobScheduler,WebSocket,db} = require('./utils');

var log = log4js.getLogger("startup"); 
if(env==="PRODUCTION"){
  log.level="info";
}


db.UpdateMainDB();
MQTTClient.start();

JobScheduler.start();

/**
 * Get port from environment and store in Express.
 */
app.set('port', port);



/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Create and start the WebSocket.
 */
WebSocket.start(server);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () {
    return console.log('Fermenta server listening on %s at port %d in %s mode', host, port, env);
  });
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
