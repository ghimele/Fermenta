import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Services from '../../services';
import InputKeyboard from '../../components/InputKeyboard';

class Settings extends React.Component {
    state = {isLoading: true, emailNotify: true, Language: 'English' , email:'',lng:'en'}

    handleSaveClick = (e) => {
        e.preventDefault();
        //const { t, i18n } = useTranslation();

        Services.Programs.updateSettings(this.state.Language,this.state.emailNotify,this.state.email)
        .then((res=>{
            if(res.error){
                Services.ServiceAlert.AlertService.error(res.message, {autoClose: true,keepAfterRouteChange:false});
            }
            else{
                localStorage.setItem("lng",this.state.lng);
                Services.ServiceAlert.AlertService.success('Settings saved!', {autoClose: true});
 
                this.setState({message:res})
            }
        }))
        .catch((error => {
            Services.ServiceAlert.AlertService.error("Error saving settings: " + error.message, {autoClose: true,keepAfterRouteChange:false});
            console.error('There was an error!', error);
        }));

    }

    handleEmailNotifyChange = (e) => {
        this.setState({ emailNotify: e.target.checked });
    }

    handleEmailChange = (value) => {
        var val = this.state.email;
        val= value;

        this.setState({ email: val });
    }

    handleLanguageChange = (e) => {
        var lang;
        lang = e.target.value;
        const lng= lang==='English' ? 'en':'it';
        Services.i18n.changeLanguage(lng);
        this.setState({ Language: lang,lng:lng });
    }

    handleGetSettings (showLoading){
        var settingsdata='';
        var logdata='';
        if(showLoading){
            Services.ServiceAlert.AlertService.info("getting data...", {autoClose: false,keepAfterRouteChange:false});
        }
        this.setState({isLoading: true});
        Services.Programs.getSettings()
        .then((data=>{
            if(data.message!==undefined ){
              settingsdata=data.message;
            }

            this.setState({emailNotify: settingsdata.EMAIL_NOTIFY,email: settingsdata.EMAIL_TO, Language:settingsdata.LANGUAGE, isLoading:false });
    
            if(showLoading){
                Services.ServiceAlert.AlertService.clear();
            }
        }))
        .catch((error => { 
            Services.ServiceAlert.AlertService.clear();
            Services.ServiceAlert.AlertService.error('Error getting settings!', this.state.options);
            console.error('There was an error!', error);
        }));
      }

    componentDidMount(){
        this.handleGetSettings();
      }

    render() {
        return (
            <Container>
                <Card className="card-width-650">
                    <Card.Header as="h2">{Services.i18n.t('settings')}</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group as={Row} controlId="formLanguage">
                                <Form.Label column sm="3">{Services.i18n.t('language')}</Form.Label>
                                <Col sm="9">
                                    <Form.Control className="inpute-settings" as="select" onChange={this.handleLanguageChange} value={this.state.Language} >
                                        <option>English</option>
                                        <option>Italiano</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formEmailNotification">
                                <Form.Check type="switch" id="custom-switch" label={Services.i18n.t('email.notification')} onChange={this.handleEmailNotifyChange} checked={this.state.emailNotify} />
                            </Form.Group>
                            <Form.Group as={Row} controlId="formEmail">
                                <Form.Label column sm="3">{Services.i18n.t('email.email')}</Form.Label>
                                <Col sm="9">
                                    {/* <Form.Control className="inpute-settings" 
                                                type="text" 
                                                as="textarea" 
                                                rows={3} 
                                                placeholder={Services.i18n.t('email.placesholder')}
                                                // "Enter email separated by semicolon ';'" 
                                                value={this.state.email} 
                                                onChange={this.handleEmailChange}
                                                disabled={!this.state.emailNotify}/> */}
                                    <InputKeyboard 
                                        required={false} 
                                        as="textarea"
                                        type="text"  
                                        baseClass="InputEmail" 
                                        layoutName="default" 
                                        placeholder={Services.i18n.t('email.placesholder')}
                                        value={this.state.email} 
                                        onChange={this.handleEmailChange} 
                                        disabled={!this.state.emailNotify}
                                    />

                                </Col>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="btn-fermenta" onClick={this.handleSaveClick}>
                            {Services.i18n.t('save')}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

// Exporting the component
export default Settings;