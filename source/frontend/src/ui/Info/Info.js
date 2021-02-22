import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import {subscribe} from '../../components/mqtt-client';

import RowComponent from './RowComponent';

const parse= function (message) {
  try {
      const item = JSON.parse(message);
      return item;
  } catch (e) {
      return message.toString();
  }
}

const customDispatchIP = function(topic, message, packet) {
  const { state } = this;
  if("Fermenta/System/IP"===topic ){
    const m=[];
    m["IP Address"]=parse(message);
    const newData = [
        m,
        ...state.data
    ];
    this.setState({ data: newData });
  }
}

const customDispatchUpTime = function(topic, message, packet) {
  const { state } = this;
  if("Fermenta/System/Uptime"===topic ){
    const m=[];
   
    const tmpmess=parse(message);
    var re = /:/;
    var newstr = tmpmess.replace(re, " Day, ");
    newstr = newstr.replace(re, " Hours, ");
    newstr = newstr.replace(re, " Minutes, ");
    newstr = newstr.replace(re, " Seconds, ");
    
    m["UpTime"]=newstr;

    const newData = [
        m,
        ...state.data
    ];
    this.setState({ data: newData });
  }
}

const customDispatchOS = function(topic, message, packet) {
  const { state } = this;
  if("Fermenta/System/OS"===topic ){
    
    const tmp=parse(message);
    const m=[]
    for (const key in tmp) {
      m[key]=tmp[key];
    };

    const newData = [
        m,
        ...state.data
    ];
    this.setState({ data: newData });
  }
}

const RowIP = subscribe({topic: 'Fermenta/System/IP',dispatch: customDispatchIP})(RowComponent);
const RowUpTime = subscribe({topic: 'Fermenta/System/Uptime',dispatch: customDispatchUpTime})(RowComponent);
const RowSystemOS = subscribe({topic: 'Fermenta/System/OS',dispatch: customDispatchOS})(RowComponent);



class Info extends React.Component {

  render() {
      return (
        <Row> 
          <Col>
            <Card>
              <Card.Header as="h2">System Info</Card.Header>
              <Card.Body>
                <Table borderless="true" hover="true">
                  <tbody>
                    <RowIP/>
                    <RowSystemOS/>
                    <RowUpTime/>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
  }
}

  // Exporting the component
export default Info;