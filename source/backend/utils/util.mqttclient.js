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
var Humidity;

//MQTT connection
const url="mqtt://192.168.1.122:1883";

function handleDistance (message) {
    Distance = message.toString();
}

function handleTemperature (message) {
    Temperature = message.toString();
}
function handleHumidity (message) {
    Humidity = message.toString();
}

function getDistance(){
    return Distance;

}
function getTemperature(){
    return Temperature;
}
function getHumidity(){
    return Humidity;
}

function start(){
    const client = mqtt.connect(url,mqttoptions);

    client.on('error', (error) => {
        log.log("MQTTClient can't connect: "+ error);
    });

    client.on('connect', () => {
        log.info("MQTTClient connection status: "+ client.connected);
        client.subscribe('Fermenta/Sensors/Distance/1');
        client.subscribe('Fermenta/Sensors/Temperature/1');
        client.subscribe('Fermenta/Sensors/Humidity/1');
    });

    client.on('message', (topic, message) => {
        log.info('MQTTClient received message %s %s', topic, message)
        switch (topic) {
            case 'Fermenta/Sensors/Distance/1':
                return handleDistance(message);
            case 'Fermenta/Sensors/Temperature/1':
                return handleTemperature(message);
            case 'Fermenta/Sensors/Humidity/1':
                return handleHumidity(message);
        }
    });
}

const MQTTClient = {
    start: start,
    getDistance: getDistance,
    getTemperature: getTemperature
};

module.exports = MQTTClient;