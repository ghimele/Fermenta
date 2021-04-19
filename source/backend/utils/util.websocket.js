var webSocket = require('ws');
const log = require('log4js').getLogger("util.websocket");
const uuid = require('uuid');

var wss = undefined;
const wsclients = new Map();
//var wsclients= [];

function handleWsClose(ws){
    ws.isAlive=false;
    //remove the client
    log.debug("client Id:" + ws.Id);
    wsclients.delete(ws.Id);
    log.debug("WSClients size: "+ wsclients.size);
    
    log.debug('client disconnected');
}

function start(server){
    //initialize the WebSocket server instance
    wss = new webSocket.Server({ server });

    wss.on('connection', function connection(ws) {
        log.debug("got ws connection");
        const ID= uuid.v4();
        ws.Id = ID; 
        log.debug("Client ID: "+ ws.Id);
        ws.isAlive = true;
        wsclients.set(ID,ws);

        ws.on('message', (message) => {
            ws.isAlive = true;
        
            //log the received message and send it back to the client
            log.debug('received: %s', message);
            ws.send(`Hello, you sent -> ${message}`);
        });

        //ws.on('close',handleWsClose);

        ws.on('close',() =>{
            ws.isAlive=false;
            //remove the client
            log.debug("client Id:" + ws.Id);
            wsclients.delete(ws.Id);
            log.debug("WSClients size: "+ wsclients.size);
            
            log.debug('client disconnected');
        });

    });

    wss.on('close', (ws) => {
        log.debug("connection closed for client id: %s",ws.id);
    });
}

function sendMessage(message){
    log.debug("WebSocket sendMessage");
    if(wss!==undefined){
        log.debug("send message over websocket: "+ JSON.stringify(message));
        log.debug("WSClients size: "+ wsclients.size);
        for (var wsclient of wsclients.values()) {
            log.debug("send message to client: "+ wsclient.Id);
            if(wsclient.readyState === webSocket.OPEN){
                wsclient.send(JSON.stringify(message));
            }
        }

        // for (var i=0; i < wsclients.length; i++) {
  
        // }

    }
}

const WebSocket = {
    start: start,
    sendMessage: sendMessage
};

module.exports = WebSocket;