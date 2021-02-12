import {Component, createElement, Children} from "react";
import PropTypes from 'prop-types';
import MQTT from "mqtt";

export default class Connector extends Component {
    state = {};
    static propTypes = {
        mqqt: PropTypes.object,
        mqttProps: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        children: PropTypes.element.isRequired,
    };

    static childContextTypes = {
        mqtt: PropTypes.object,
        mqttStatus: PropTypes.string
    };

    constructor(props, context) {
        super(props, context);
        
        // const initialState = {};
        // this.state = initialState;

        const { mqttProps, mqtt } = props;

        const typeofProp = typeof mqttProps === 'string' ? true : false
		this.mqtt = (mqtt) ? mqtt : typeofProp ? MQTT.connect(mqttProps) : MQTT.connect(mqttProps.url, mqttProps.options)
    }

    getChildContext() {
        return {
            mqtt: this.mqtt,
            mqttStatus: this.state.mqttStatus
        };
    }

    componentDidMount() {
        this.mqtt.on('connect', this._makeStatusHandler('connected'));
        this.mqtt.on('reconnect', this._makeStatusHandler('reconnect'));
        this.mqtt.on('close',  this._makeStatusHandler('closed'));
        this.mqtt.on('offline', this._makeStatusHandler('offline'));
        this.mqtt.on('error', console.error);
    }

    componentWillUnmount(){
        this.mqtt.end();
    }

    _makeStatusHandler = (status) => {
        return () => {
            this.setState({ mqttStatus: status })
        }
    };

    render() {
        return this.renderConnected();
    }

    renderConnected() {
        return Children.only(this.props.children);
    }
}