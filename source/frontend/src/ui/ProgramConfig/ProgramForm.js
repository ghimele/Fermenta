import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import FormVolume from './ProgramFormVolume';
import TableCycles from './TableCycles';
import Services from '../../services';

class ProgramForm extends React.Component {
    state = { useVolume:this.props.program.UseVolume, selectedProgram:this.props.program, error: false, message:"" };

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

    handleSaveClick=(e)=>{
        e.preventDefault();

        Services.Programs.saveProgram(this.state.selectedProgram.ID,this.state.selectedProgram)
        .then((res=>{
            if(res.error){
                Services.ServiceAlert.AlertService.error(res.message, {autoClose: true,keepAfterRouteChange:false});
            }
            else{
                Services.ServiceAlert.AlertService.success('Program ' + this.state.selectedProgram.NAME + ' saved!', {autoClose: true});
                this.setState({message:res})
            }
        }))
        .catch((error => {
            console.error('There was an error!', error);
        }));
    }

    handleNameChange=(e)=>{
        const p=this.state.selectedProgram;
        p.NAME= e.target.value;
        if(p.DATA!=null){
            p.DATA.Name=p.NAME;
        }
        this.setState({ selectedProgram: p});
    }

    handleDescriptionChange=(e)=>{
        const p=this.state.selectedProgram;
        if (p.DATA!=null){
            p.DATA.Description= e.target.value;
            this.setState({ selectedProgram: p});
        }
    }

    handleVolumeChange=(e)=>{
        const p=this.state.selectedProgram;
        if(p.DATA!=null){
            p.DATA.UseVolume=e.target.checked;
            this.setState({ useVolume: e.target.checked, selectedProgram: p  });
        }
    }

    handleVolumeSizeChange=(v,type)=>{
        const p=this.state.selectedProgram;
        if(p.DATA!=null){
            if(type==="Width"){
                p.DATA.Width=v;
            }
            
            if(type==="Length"){
                p.DATA.Length=v;
            }

            if(type==="Height"){
                p.DATA.Height=v;
            }
            
            this.setState({ selectedProgram: p  });
        }
    }

    componentDidUpdate(prevProps) {    
        try{  
            if (prevProps.program !== this.props.program) {    
                this.setState({ selectedProgram: this.props.program });    
            }

            if (prevProps.program.DATA.UseVolume !== this.props.program.DATA.UseVolume) {        
                this.setState({ useVolume: this.props.program.DATA.UseVolume });    
            }
        }catch(error){    
            console.log("Error in React Table component will receive props : " + error);    
        }            
    } 

    render() {
    const useVolume=this.state.useVolume;
    
    if(this.state.selectedProgram===''){
        return (null);
    }

    return (
    <div>
        <Form>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter Name" value={this.state.selectedProgram.NAME} onChange={this.handleNameChange}/>
            </Form.Group>

            <Form.Group controlId="formDesciprtion">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter Description" value={this.state.selectedProgram.DATA.Description} onChange={this.handleDescriptionChange}/>
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
                            width={this.state.selectedProgram.DATA.Width} 
                            length={this.state.selectedProgram.DATA.Length} 
                            height={this.state.selectedProgram.DATA.Height}
                            onVolumeSizechange={this.handleVolumeSizeChange}
                />
            </Card>
            <br />
            <TableCycles cycleRows={this.state.selectedProgram.DATA.Cycles} useVolume={useVolume} />
            <br />
            <Button variant="primary" type="submit" className="btn-fermenta" onClick={this.handleSaveClick}>
                Save
            </Button>
        </Form>
      </div>
  );
  }
}

export default ProgramForm;