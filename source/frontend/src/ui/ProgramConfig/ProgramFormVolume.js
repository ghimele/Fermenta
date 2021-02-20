import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';



class ProgramFormVolume extends React.Component {
    state = { Width:'', Length:'', Height:''};

    constructor(props) {
        super(props);
    
        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleLengthChange = this.handleLengthChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
    }

    handleWidthChange=(e)=>{
        this.setState({ Width: e.target.value});
        this.props.onVolumeSizechange(e.target.value,"Width")
    }

    handleLengthChange=(e)=>{
        this.setState({ Length: e.target.value});
        this.props.onVolumeSizechange(e.target.value,"Length")
    }

    handleHeightChange=(e)=>{
        this.setState({ Height: e.target.value});
        this.props.onVolumeSizechange(e.target.value,"Height")
    }

    /* This event will fire on next properties update */    
    componentWillReceiveProps(nextProps) {    
        try{  

            if (nextProps.Height!==undefined) {        
                this.setState({ Height: nextProps.Height });    
            }

            if (nextProps.Width!==undefined) {    
                this.setState({ Width: nextProps.Width });    
            }

            if (nextProps.Length!==undefined) {        
                this.setState({ Length: nextProps.Length });    
            }

            
        }catch(error){    
    
            console.log("Error in React Table component will receive props : " + error);    
   
        }            
    }  

    render() {
        if(this.props.useVolume){
            return (
            <div className="p-2">
                <Form.Row>
                    <Form.Label className="ml-1">Configure the container size, dimension in cm</Form.Label>
                </Form.Row>
                <Form.Row >
                    <Form.Group controlId="formVolumeWidth" as={Col}>
                        <Form.Label>Width</Form.Label>
                        <Form.Control required type="number" placeholder="Width in cm" value={this.state.Width} onChange={this.handleWidthChange}/>
                    </Form.Group>
                    <Form.Group controlId="formVolumeLength" as={Col}>
                        <Form.Label>Length</Form.Label>
                        <Form.Control required type="number" placeholder="Length in cm" value={this.state.Length} onChange={this.handleLengthChange}/>
                    </Form.Group>
                    <Form.Group controlId="formVolumeHeight" as={Col}>
                        <Form.Label>Height</Form.Label>
                        <Form.Control required type="number" placeholder="Height in cm" value={this.state.Height} onChange={this.handleHeightChange}/>
                    </Form.Group>
                </Form.Row>
            </div>
            );
        }
        else{
            return null;
        }
    }
}

export default ProgramFormVolume;