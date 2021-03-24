const mqtt = require('mqtt');
const log = require('log4js').getLogger("util.mqtt");

const mqttoptions = {
    keepalive: 30,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    qos: 1,
    will: {
      topic: "WillMsg",
      payload: "Connection Closed abnormally..!",
      qos: 1,
      retain: false,
    },
    rejectUnauthorized: true,
    clientId: 'FermentaBackendClient_' + Math.random().toString(16).substr(2, 8),
    username: 'Fermenta',
    password: 'Ferment@21',
    port: 1883
};

var Distance;
var Temperature;

//MQTT connection
const url="mqtt://192.168.1.122:1883";

function handleDistance (message) {
    Distance = message.toString();
}

function getDistance(){
    return Distance;

}function getTemperature(){
    return Temperature;
}

function start(){
    const client = mqtt.connect(url,mqttoptions);

    log.info("MQTT connection status: "+ client.connected);

    client.subscribe('Fermenta/Sensors/Distance/1');

    client.on('error', (error) => {
        log.log("Can't connect: "+ error);
    });

    client.on('connect', () => {
        client.subscribe('Fermenta/Sensors/Distance/1');
    });

    client.on('message', (topic, message) => {
        log.info('received message %s %s', topic, message)
        switch (topic) {
        case 'Fermenta/Sensors/Distance/1':
            return handleDistance(message)
        }
    });
}

const MQTTClient = {
    start: start,
    getDistance: getDistance,
    getTemperature: getTemperature
};

module.exports = MQTTClient;