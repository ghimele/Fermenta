import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GaugeChart from './Charts/GaugeChart';
import GaugeNumberChart from './Charts/GaugeNumberChart';
import {subscribe} from './mqtt-client';
import StackedBarChart from './Charts/StackedBarChart';

const GaugeCPUTemp = subscribe({topic: 'Fermenta/System/CPU/Temp'})(GaugeChart);
const GaaugeCPUUsage = subscribe({topic: 'Fermenta/System/CPU/Load'})(GaugeChart);
const GaaugeMemoryUsage = subscribe({topic: 'Fermenta/System/Memory/Usage'})(GaugeChart);
const GaaugeNumberTotalMemory = subscribe({topic: 'Fermenta/System/Memory/Total'})(GaugeNumberChart);
// const TestSubscribe = subscribe({topic: 'Fermenta/System/MemoryData'})(Testsubscribe);
const StackedBarChartMemory = subscribe({topic: 'Fermenta/System/MemoryData'})(StackedBarChart);
class Monitor extends React.Component {
   
  render() {
      return (
        <Row> 
          <Col>
            <Card >
              <Card.Header as="h2">CPU</Card.Header>
              <Card.Body>
                 <GaugeCPUTemp Title="CPU Temperature" Text="CardTest text" Suffix="°C" Prefix=""/>
                <GaaugeCPUUsage  Title="CPU Usage" Text="CardTest text" Suffix="%"/> 
                </Card.Body>
            </Card>
          </Col>
            <Col>
            <Card>
              <Card.Header as="h2">Memory</Card.Header>
              <Card.Body>
                <GaaugeMemoryUsage Title="Memory Usage" Suffix="%" Prefix=""/>
                {/* <TestSubscribe field="memusage"></TestSubscribe> */}
                <StackedBarChartMemory Title="Memory info" field1="memory_active" field2="memory_available"/>
                <GaaugeNumberTotalMemory Title="Total Memory" Suffix="GB" Prefix=""/>
                </Card.Body>
            </Card>
            </Col>
          {/* </CardGroup> */}
        </Row>
      );
    }
}

  // Exporting the component
export default Monitor;