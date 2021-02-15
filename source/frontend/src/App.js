import React, { useContext } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from './components/NavBar';
import SideBar from './components/SideBar';
import Main from './components/Main';
import Monitor from './components/Monitor';
import classNames from 'classnames';
import MQTTConnector from './components/mqtt-client/connector';

import './scss/App.scss';

class App extends React.Component {
  state = { isMinimized: localStorage.getItem("isMinimized"),mqttClient:undefined};

  mqttClient=undefined;
  url=  "ws://" + window.location.hostname + ":1884";

  options = {
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
      qos: 0,
      retain: false,
    },
    rejectUnauthorized: true,
    clientId: 'FermentaClient_' + Math.random().toString(16).substr(2, 8),
    username: 'Fermenta',
    password: 'Ferment@21',
    port: 1884
  };

  toggleSidebar(newisMinimized){
    this.setState({ isMinimized: newisMinimized });
  }

  handleError = (error) =>{
    this.setState({ Error: error });
  }

  render() {
    const isMinimized = this.state.isMinimized;
    const MainClass = classNames("main", "container-fluid", "flex-shrink-0", {"mini": isMinimized});

    return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
      </header>
      
      <Container fluid className="flex-shrink-0">
        <Row className="h-100">
          <SideBar isMinimized={this.toggleSidebar.bind(this)}></SideBar>
          
          <main className={MainClass} id="Main"> 
          <MQTTConnector mqttProps={{ url: this.url,options: this.options}}>
            <Router>
              <Switch>
                <Route path="/" exact component={() => <Main />} />
                <Route path="/Monitor" exact component={() => <Monitor mqttClient={this.state.mqttClient}/>} />
              </Switch>
            </Router>
            </MQTTConnector>
          </main>
          
        </Row>
      </Container>
      
      
    </div>
    );
  }
}

export default App;
