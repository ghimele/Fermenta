import React from 'react';
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
const StackedBarChartMemory = subscribe({topic: 'Fermenta/System/MemoryData'})(StackedBarChart);
const GaaugeNumberTotalMemory = subscribe({topic: 'Fermenta/System/Memory/Total'})(GaugeNumberChart);
const GaaugeNumberMemoryUsed = subscribe({topic: 'Fermenta/System/Memory/Active'})(GaugeNumberChart);
const GaaugeNumberMemoryFree = subscribe({topic: 'Fermenta/System/Memory/Free'})(GaugeNumberChart);

const GaaugeDiskUsage = subscribe({topic: 'Fermenta/System/Disk/Usage'})(GaugeChart);
const StackedBarChartDisk = subscribe({topic: 'Fermenta/System/DiskData'})(StackedBarChart);
const GaaugeNumberTotalDisk = subscribe({topic: 'Fermenta/System/Disk/Total'})(GaugeNumberChart);
const GaaugeNumberDiskUsed = subscribe({topic: 'Fermenta/System/Disk/Used'})(GaugeNumberChart);
const GaaugeNumberDiskFree = subscribe({topic: 'Fermenta/System/Disk/Free'})(GaugeNumberChart);


class Monitor extends React.Component {
   
  render() {
      return (
        <Row> 
          
          <Col md="6">
            <Card>
              <Card.Header as="h2">Memory</Card.Header>
              <Card.Body>
                <GaaugeMemoryUsage Title="Memory Usage" Suffix="%" Prefix=""/>
                <StackedBarChartMemory Title="Memory info" field1="memory_active" field2="memory_available"/>
                <GaaugeNumberTotalMemory Title="Total Memory" Suffix="GB" Prefix=""/>
                <GaaugeNumberMemoryUsed Title="Memory Used" Suffix="GB" Prefix=""/>
                <GaaugeNumberMemoryFree Title="Memory Free" Suffix="GB" Prefix=""/>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <Card.Header as="h2">Disk</Card.Header>
              <Card.Body>
                <GaaugeDiskUsage Title="Disk Usage" Suffix="%" Prefix=""/>
                <StackedBarChartDisk Title="Disk info" field1="disk_used" field2="disk_free"/>
                <GaaugeNumberTotalDisk Title="Disk Size" Suffix="GB" Prefix=""/>
                <GaaugeNumberDiskUsed Title="Disk Used" Suffix="GB" Prefix=""/>
                <GaaugeNumberDiskFree Title="Disk Free" Suffix="GB" Prefix=""/>
              </Card.Body>
            </Card>
          </Col>
          <Col md="auto">
            <Card >
              <Card.Header as="h2">CPU</Card.Header>
              <Card.Body>
                <GaugeCPUTemp Title="CPU Temperature" Text="CardTest text" Suffix="°C" Prefix=""/>
                <GaaugeCPUUsage  Title="CPU Usage" Text="CardTest text" Suffix="%"/> 
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
  }
}

  // Exporting the component
export default Monitor;