import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import DateTime from './DateTime';
import Temperature from './Temperature';
import Humidity from './Humidity';
import {subscribe} from '../../components/mqtt-client';

const CompTemperature = subscribe({topic: 'Fermenta/Sensors/Temperature/1'})(Temperature);
const CompHumidity = subscribe({topic: 'Fermenta/Sensors/Humidity/1'})(Humidity);

class NavBar extends React.Component {
    render() {
      return (
        <Navbar collapseOnSelect bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/">Fermenta</Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Item>
                  <CompTemperature Text=""/>
                </Nav.Item>
                <Nav.Item>
                  <CompHumidity Text=""/>
                </Nav.Item>
                <Nav.Item>
                  <DateTime/>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      );
    }
  }

  // Exporting the component
export default NavBar;