import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgramsDropDown from './ProgramsDropDown';
import ProgramForm from './ProgramForm';
import Container from 'react-bootstrap/Container';

class ProgramConfig extends React.Component {
  state = { programs:'', selectedProgram:'', isProgramSelected:false};

  handleSelectedProgramChange=(program)=>{
    this.setState({ selectedProgram: program,isProgramSelected:true });
  }

  render() {
      return (
        <Container fluid>
        {/* <Row> 
          <Col md="12"> */}
            <ProgramsDropDown programs={this.state.programs.programs} onSelectedProgramChange={this.handleSelectedProgramChange} />
            <br />
            {
              this.state.isProgramSelected ? <ProgramForm program={this.state.selectedProgram}/> : <div></div>
            }
          {/* </Col>
        </Row> */}
        </Container>
      );
  }
}

  // Exporting the component
export default ProgramConfig;