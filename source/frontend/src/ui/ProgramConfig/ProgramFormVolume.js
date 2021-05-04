import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Services from '../../services';


class ProgramFormVolume extends React.Component {
    state = { width:this.props.width, length:this.props.length, height:this.props.height};

    constructor(props) {
        super(props);
    
        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleLengthChange = this.handleLengthChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
    }

    handleWidthChange=(e)=>{
        this.setState({ width: e.target.value});
        this.props.onVolumeSizechange(e.target.value,"Width");
    }

    handleLengthChange=(e)=>{
        this.setState({ length: e.target.value});
        this.props.onVolumeSizechange(e.target.value,"Length");
    }

    handleHeightChange=(e)=>{
        this.setState({ height: e.target.value});
        this.props.onVolumeSizechange(e.target.value,"Height");
    }

    /* This event will fire on next properties update */    
    componentDidUpdate(prevProps) {    
        try{  
            if (prevProps.width!== this.props.width) {    
                this.setState({ width: this.props.width });    
            }

            if (prevProps.length!== this.props.length) {        
                this.setState({ length: this.props.length });    
            }

            if (prevProps.height!== this.props.height) {        
                this.setState({ height: this.props.height });    
            }
        }catch(error){    
            console.log("componentDidUpdate : " + error);    
        }            
    } 
    
    render() {
        if(this.props.useVolume){
            return (
            <div className="p-2">
                <Form.Row>
                    <Form.Label className="ml-1">{Services.i18n.t('volume.label')}</Form.Label>
                </Form.Row>
                <Form.Row >
                    <Form.Group controlId="formVolumeWidth" as={Col}>
                        <Form.Label>{Services.i18n.t('width')}</Form.Label>
                        <Form.Control required type="number" placeholder={Services.i18n.t('volume.width_ph')} value={this.state.width} onChange={this.handleWidthChange}/>
                    </Form.Group>
                    <Form.Group controlId="formVolumeLength" as={Col}>
                        <Form.Label>{Services.i18n.t('length')}</Form.Label>
                        <Form.Control required type="number" placeholder={Services.i18n.t('volume.length_ph')} value={this.state.length} onChange={this.handleLengthChange}/>
                    </Form.Group>
                    <Form.Group controlId="formVolumeHeight" as={Col}>
                        <Form.Label>{Services.i18n.t('height')}</Form.Label>
                        <Form.Control required type="number" placeholder={Services.i18n.t('volume.height_ph')} value={this.state.height} onChange={this.handleHeightChange}/>
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