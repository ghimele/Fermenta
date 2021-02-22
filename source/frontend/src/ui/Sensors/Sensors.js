import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GaugeNumberChart from  '../../components/Charts/GaugeNumberChart';
import {subscribe} from '../../components/mqtt-client';


const GaaugeNumberTotalMemory = subscribe({topic: 'Fermenta/Sensors/Distance/1'})(GaugeNumberChart);

class Sensors extends React.Component {
   
  render() {
      return (
        <Row> 
          <Col>
            <Card>
              <Card.Header as="h2">Distance Sensors</Card.Header>
              <Card.Body>
                <GaaugeNumberTotalMemory Title="Distance #1" Suffix="cm" Prefix=""/>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header as="h2">Temperature Sensors</Card.Header>
              <Card.Body>
                {/* <GaaugeNumberTotalMemory Title="Distance #1" Suffix="cm" Prefix=""/> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
  }
}

  // Exporting the component
export default Sensors;