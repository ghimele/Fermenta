import React,{useState} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormVolume from './ProgramFormVolume';
import TableCycles from './TableCycles';


class ProgramForm extends React.Component {
    state = { useVolume:this.props.program.UseVolume, selectedProgram:this.props.program};

    /* Initial loading of program properties */      
    ProgramEmpty={
        Name: "",
        Description: "",
        UseVolume: false,
        Width: 0,
        Length: 0,
        Height: 0,
        Cycles: ""
    }

    handleNameChange=(e)=>{
        const p=this.state.selectedProgram;
        p.Name= e.target.value;
        this.setState({ selectedProgram: p});
    }

    handleDescriptionChange=(e)=>{
        const p=this.state.selectedProgram;
        p.Description= e.target.value;
        this.setState({ selectedProgram: p});
    }

    handleVolumeChange=(e)=>{
        const p=this.state.selectedProgram;
        p.UseVolume=e.target.checked;
        this.setState({ useVolume: e.target.checked, selectedProgram: p  });
    }

    handleVolumeSizeChange=(v,type)=>{
        const p=this.state.selectedProgram;
        if(type==="Width"){
            p.Width=v;
        }
        
        if(type==="Length"){
            p.Length=v;
        }

        if(type==="Height"){
            p.Height=v;
        }
        
        this.setState({ selectedProgram: p  });
    }

    componentDidUpdate(prevProps) {    
        try{  
            if (prevProps.program !== this.props.program) {    
                this.setState({ selectedProgram: this.props.program });    
            }

            if (prevProps.program.UseVolume !== this.props.program.UseVolume) {        
                this.setState({ useVolume: this.props.program.UseVolume });    
            }
        }catch(error){    

            console.log("Error in React Table component will receive props : " + error);    
   
        }            
    } 

    render() {
    const useVolume=this.state.useVolume;

    return (
    <div>
        <Form>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter Name" value={this.state.selectedProgram.Name} onChange={this.handleNameChange}/>
            </Form.Group>

            <Form.Group controlId="formDesciprtion">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter Description" value={this.state.selectedProgram.Description} onChange={this.handleDescriptionChange}/>
            </Form.Group>
            <br />
            <Card>
                <Card.Header>
                    <h4>Volume</h4>
                </Card.Header>
                <Form.Check 
                        type="switch"
                        id="cbVolume"
                        label="Use the volume of dough"
                        onChange={this.handleVolumeChange}
                        checked={useVolume}
                        className="m-2"
                />
                <FormVolume useVolume={useVolume} 
                            width={this.state.selectedProgram.Width} 
                            length={this.state.selectedProgram.Length} 
                            height={this.state.selectedProgram.Height}
                            onVolumeSizechange={this.handleVolumeSizeChange}
                />
            </Card>
            <br />
            <TableCycles cycleRows={this.state.selectedProgram.Cycles} useVolume={useVolume} />
            <br />
            <Button variant="primary" type="submit" className="btn-fermenta">
                Submit
            </Button>
        </Form>
      </div>
  );
  }
}

export default ProgramForm;