import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GaugeNumberChart from  '../../components/Charts/GaugeNumberChart';
import {subscribe} from '../../components/mqtt-client';
import Services from '../../services';

const GaaugeNumberDistance = subscribe({topic: 'Fermenta/Sensors/Distance/1'})(GaugeNumberChart);
const GaaugeNumberTemperature = subscribe({topic: 'Fermenta/Sensors/Temperature/1'})(GaugeNumberChart);

class Sensors extends React.Component {
   
  render() {
      return (
        <Row> 
          <Col md="auto" className="mb-3">
            <Card >
              <Card.Header as="h2">{Services.i18n.t('sensor.distance_plural')}</Card.Header>
              <Card.Body>
                <GaaugeNumberDistance Title={Services.i18n.t('distance') + " #1"} Suffix="cm" Prefix=""/>
              </Card.Body>
            </Card>
          </Col>
          <Col md="auto" className="mb-3">
            <Card>
              <Card.Header as="h2">{Services.i18n.t('sensor.temperature_plural')}</Card.Header>
              <Card.Body>
                <GaaugeNumberTemperature Title={Services.i18n.t('temperature') + " #1"} Suffix="°C" Prefix=""/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
  }
}

  // Exporting the component
export default Sensors;