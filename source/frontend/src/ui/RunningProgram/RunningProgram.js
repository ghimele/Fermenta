import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Icons from '../../components/utilities/utils.icons';

class RunningProgram extends React.Component {
   
  render() {
      return (
        <Row> 
          <Col md="auto" className="mb-3">
            <Card>
              <Card.Header as="h2">Active Program</Card.Header>
              <Card.Body>
                <Table borderless="true" hover="true" style={{fontSize: '1.5em'}}>
                  <tbody>
                    <tr>
                        <td width="50">Name:</td>
                        <td>AAAA</td>
                        <td width="50">Description:</td>
                        <td>AAAA</td>
                    </tr>
                    <tr>
                        <td width="50">Started:</td>
                        <td>BBB</td>
                        <td width="50">Elapsed time:</td>
                        <td>CCC</td>
                    </tr>
                  </tbody>
                </Table>
            </Card.Body>
            </Card>
          </Col>
          <Col md="auto" className="mb-3">
            <Card>
              <Card.Header as="h2">Current Data</Card.Header>
              <Card.Body>
                <Table borderless="true" hover style={{fontSize: '1.5em'}}>
                  <tbody>
                  <tr >
                      <td ><Icons.TempHotLine className="align-middle"/><span className="align-middle"> 20</span><Icons.CelsiusLine fontSize="1.1em" className="align-middle"/></td>
                      <td ><Icons.Humidity className="align-middle"/><span className="align-middle">CCC</span></td>
                      <td ><Icons.OutlineColumnHeight className="align-middle"/><span className="align-middle">DDD</span></td>
                      <td ><Icons.Roundcube className="align-middle"/><span className="align-middle">XXX</span></td>
                  </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="auto" className="mb-3">
            <Card>
              <Card.Header as="h2">Cycles</Card.Header>
              <Card.Body>
                <Table borderless="true" hover="true" style={{fontSize: '1.5em'}}>
                  <thead>    
                    <tr>    
                      <th>#</th>
                      <th>Start</th>
                      <th>Elapsed Time</th>
                      <th>End</th>
                      <th>Target type</th>  
                    </tr> 
                  </thead>
                  <tbody>
                  
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
export default RunningProgram;