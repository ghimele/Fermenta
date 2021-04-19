import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import DateTime from './DateTime';
import Temperature from './Temperature';
import Humidity from './Humidity';
import {subscribe} from '../../components/mqtt-client';
import Icons from '../../components/utilities/utils.icons';
import UtilsDom from '../../components/utilities/utils.dom';

const CompTemperature = subscribe({topic: 'Fermenta/Sensors/Temperature/1'})(Temperature);
const CompHumidity = subscribe({topic: 'Fermenta/Sensors/Humidity/1'})(Humidity);

class NavBar extends React.Component {
  state={ SideBarShow:false};

  toggleSelected = (e) => {
    UtilsDom.ToggleClass("Sidebar","show");
  };

  render() {
    return (
      <Navbar collapseOnSelect bg="dark" variant="dark" fixed="top" expand>
          <Navbar.Toggle className="btn-transparent d-sm-none d-block" id="HamburgerButton" onClick={this.toggleSelected}><Icons.MenuLine fontSize="1.5em"></Icons.MenuLine></Navbar.Toggle>
          <Navbar.Brand href="/" className="NavBarBrand">Fermenta</Navbar.Brand>
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
      </Navbar>
    );
  }
}

  // Exporting the component
export default NavBar;