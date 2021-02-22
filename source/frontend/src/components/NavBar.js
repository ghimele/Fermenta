import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import DateTime from './DateTime';

class NavBar extends React.Component {
    render() {
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/">Fermenta</Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
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