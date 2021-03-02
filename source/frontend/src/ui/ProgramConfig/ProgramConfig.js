import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgramsDropDown from './ProgramsDropDown';
import ProgramForm from './ProgramForm';
import Services from '../../services';

class ProgramConfig extends React.Component {
  state = { programs:'', selectedProgram:'', isProgramSelected:false};

  ProgramsProps=[
    {
      Id: 1,
      Name: "Test",
      Description: "Test description",
      UseVolume: false,
      Width: 0,
      Length: 0,
      Height: 0,
      Cycles: [
        {       
          Temperature:"20",    
          Duration:"60",    
          Volume:""
        },
        {    
          Temperature:"30",    
          Duration:"600",    
          Volume:""
        }
      ]
    },
    {
      Id: 2,
      Name: "Test2",
      Description: "Test2 description",
      UseVolume: true,
      Width: 10,
      Length: 10,
      Height: 10,
      Cycles: [
        {    
          Temperature:"20",    
          Duration:"30",    
          Volume:""
        },
        {    
          Temperature:"30",    
          Duration:"",    
          Volume:"3"
        }
      ]
    }
  ]

  handleSelectedProgramChange=(program)=>{
    this.setState({ selectedProgram: program,isProgramSelected:true });
  }

  render() {
      return (
        <Row> 
          <Col>
            <ProgramsDropDown programs={this.state.programs.programs} onSelectedProgramChange={this.handleSelectedProgramChange} />
            <br />
            {
              this.state.isProgramSelected ? <ProgramForm program={this.state.selectedProgram}/> : <div></div>
            }
          </Col>
        </Row>
      );
  }
}

  // Exporting the component
export default ProgramConfig;