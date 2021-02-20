import React,{useState} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormVolume from './ProgramFormVolume';
import TableCycles from './TableCycles';


class ProgramForm extends React.Component {
    state = { useVolume:'', selectedProgram:''};

    /* Initial loading of program properties */      
    ProgramEmpty={
        Name: "",
        Description: "",
        UseVolume: false,
        Width: 0,
        Length: 0,
        Heigth: 0,
        Cycles: ""
    }

    handleVolumeChange=(e)=>{
        const p=this.state.selectedProgram;
        p.UseVolume=e.target.checked;
        this.setState({ useVolume: e.target.checked, selectedProgram: p  });
    }

    handleVolumeSizeChange=(v,type)=>{
        const p=this.state.selectedProgram;
        if(type==="Width")
            p.Width=v;
        else if(type==="Length")
            p.Length=v;
        else if(type==="Heigth")
            p.Heigth=v;
        
        this.setState({ selectedProgram: p  });
    }

    /* This event will fire on next properties update */    
    componentWillReceiveProps(nextProps) {    
        try{    
            if (nextProps.program !==undefined) {    
                this.setState({ selectedProgram: nextProps.program,useVolume:nextProps.program.UseVolume });    
            }else{    
                this.setState({ selectedProgram: this.ProgramEmpty });    
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
                <Form.Control required type="text" placeholder="Enter Name" value={this.state.selectedProgram.Name} />
            </Form.Group>

            <Form.Group controlId="formDesciprtion">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter Description" value={this.state.selectedProgram.Description}/>
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
                            Width={this.state.selectedProgram.Width} 
                            Length={this.state.selectedProgram.Length} 
                            Height={this.state.selectedProgram.Height}
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