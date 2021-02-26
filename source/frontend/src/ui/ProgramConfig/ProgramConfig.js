import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgramsDropDown from './ProgramsDropDown';
import ProgramForm from './ProgramForm';

class ProgramConfig extends React.Component {
  state = { programs:'', selectedProgram:'', isProgramSelected:false, isLoading:true};

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

  componentDidMount(){

    fetch("http://192.168.1.122:3000/api/programs").then((res) => res.json())
    .then((programs=>{
      this.setState({programs, isLoading:false})
    }));

  }

  render() {
    if(!this.state.isLoading){
      return (
        <Row> 
          <Col>
            <ProgramsDropDown programs={this.state.programs.programs} onSelectedProgramChange={this.handleSelectedProgramChange} isLaoding={this.state.isLoading} programs2={this.ProgramsProps}/>
            <br />
            {
              this.state.isProgramSelected ? <ProgramForm program={this.state.selectedProgram}/> : <div></div>
            }
          </Col>
        </Row>
      );
    }
    else{
      return (null);
    }
  }
}

  // Exporting the component
export default ProgramConfig;