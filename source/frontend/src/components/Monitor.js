import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GaugeChart from './Charts/GaugeChart';
import GaugeNumberChart from './Charts/GaugeNumberChart';
import {subscribe} from './mqtt-client';
import StackedBarChart from './Charts/StackedBarChart';
import Services from '../services';

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
          
          <Col md="6" className="mb-4">
            <Card >
              <Card.Header as="h2">{Services.i18n.t('memory.memory')}</Card.Header>
              <Card.Body>
                <GaaugeMemoryUsage Title={Services.i18n.t('memory.usage')} Suffix="%" Prefix=""/>
                <StackedBarChartMemory Title={Services.i18n.t('memory.info')} field1="memory_active" field2="memory_available"/>
                <GaaugeNumberTotalMemory Title={Services.i18n.t('memory.total')} Suffix="GB" Prefix=""/>
                <GaaugeNumberMemoryUsed Title={Services.i18n.t('memory.used')} Suffix="GB" Prefix=""/>
                <GaaugeNumberMemoryFree Title={Services.i18n.t('memory.free')} Suffix="GB" Prefix=""/>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6" className="mb-4">
            <Card>
              <Card.Header as="h2">{Services.i18n.t('disk.disk')}</Card.Header>
              <Card.Body>
                <GaaugeDiskUsage Title={Services.i18n.t('disk.usage')} Suffix="%" Prefix=""/>
                <StackedBarChartDisk Title={Services.i18n.t('disk.info')} field1="disk_used" field2="disk_free"/>
                <GaaugeNumberTotalDisk Title={Services.i18n.t('disk.size')} Suffix="GB" Prefix=""/>
                <GaaugeNumberDiskUsed Title={Services.i18n.t('disk.used')} Suffix="GB" Prefix=""/>
                <GaaugeNumberDiskFree Title={Services.i18n.t('disk.free')} Suffix="GB" Prefix=""/>
              </Card.Body>
            </Card>
          </Col>
          <Col md="auto" className="mb-4">
            <Card >
              <Card.Header as="h2">{Services.i18n.t('cpu.cpu')}</Card.Header>
              <Card.Body>
                <GaugeCPUTemp Title={Services.i18n.t('cpu.temperature')} Text="CardTest text" Suffix="°C" Prefix=""/>
                <GaaugeCPUUsage  Title={Services.i18n.t('cpu.usage')} Text="CardTest text" Suffix="%"/> 
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
  }
}

  // Exporting the component
export default Monitor;