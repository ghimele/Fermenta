import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Icons from '../../components/utilities/utils.icons';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Services from '../../services';
import UtilsDom from '../../components/utilities/utils.dom';
//import LoadingFrame from '../../components/LoadingFrame';

class ProgramsDropDown extends React.Component {
    state = { DropDowntitle:'',Programs:'', SelectedProgram:'', isLoading: true, programselected: false,
    options: {autoClose: true,keepAfterRouteChange:false}};
    ref= React.createRef();

    newProgram= {
        ID:"",
        NAME: "NewProgram",
        DATA:{
            Name: "Test",
            Description: "",
            UseVolume: false,
            Width: 0,
            Length: 0,
            Height: 0,
            Cycles: [
                {    
                Id: "1", 
                Temperature:"30",    
                End:{
                    Type:"Duration",
                    Value:"60"
                    }
                }
            ]
        }
    }

    handleNew=(e)=>{
        e.preventDefault();

        Services.Programs.newProgram(this.newProgram)
        .then((res=>{
            this.setState({message:res});
            if(res.error){
                Services.ServiceAlert.AlertService.error(res.message, this.state.options);
            }
            else{
                if(res.message.lastInsertRowid){
                    Services.ServiceAlert.AlertService.success(Services.i18n.t('program.action.created'), this.state.options);
                    this.handleGetPrograms(false,res.message.lastInsertRowid);
                }
            }
        }))
        .catch((error => { 
            Services.ServiceAlert.AlertService.error(Services.i18n.t('program.error.creating'), this.state.options);
            console.error('There was an error!', error);
          }));
        
    }

    handleDelete=(e)=>{
        e.preventDefault();
        if(this.state.SelectedProgram){
            const programName= this.state.SelectedProgram.NAME;
            Services.Programs.deleteProgram(this.state.SelectedProgram.ID)
            .then((res=>{
                this.setState({message:res, SelectedProgram:'',programselected:false});
                if(res.error){
                    Services.ServiceAlert.AlertService.error(res.message, this.state.options);
                }
                else{
                    Services.ServiceAlert.AlertService.success(Services.i18n.t('program.action.deleted', {program:programName}) , this.state.options);
                    this.handleGetPrograms(false,-1);
                    this.props.onSelectedProgramChange('');
                }
            }))
            .catch((error => {
                Services.ServiceAlert.AlertService.error(Services.i18n.t('program.error.deleting', {program:programName}), this.state.options);
                console.error('There was an error!', error);
            }));
        }
    }

    handleStart=(e)=>{
        e.preventDefault();
        if(this.state.SelectedProgram){
            const programName= this.state.SelectedProgram.NAME;
            Services.Programs.startProgram(this.state.SelectedProgram.ID)
            .then((res=>{
                this.setState({message:res, SelectedProgram:'',programselected:false});
                if(res.error){
                    Services.ServiceAlert.AlertService.error(res.message, this.state.options);
                }
                else{
                    Services.ServiceAlert.AlertService.success(Services.i18n.t('program.action.started', {program:programName}) , this.state.options);
                    this.handleGetPrograms(false,-1);
                    this.props.onSelectedProgramChange('');
                }
            }))
            .catch((error => {
                Services.ServiceAlert.AlertService.error(Services.i18n.t('program.error.starting', {program:programName}), this.state.options);
                console.error('There was an error!', error);
            }));
        }
    }

    handleSelect=(e)=>{
        console.log(e);
        console.log(this.ref);

        UtilsDom.UnselectItems(this.ref.current.children[1].children);
        UtilsDom.SelectItem(e,this.ref.current.children[1].children);
        
        var selectedp;
        if(this.state.Programs.length>0){
            
            this.state.Programs.map(p =>{
                if(p.ID===parseInt(e)){
                    selectedp=p;
                }
            });
        }

        if(selectedp!==undefined){
            this.setState({ DropDowntitle: selectedp.NAME, SelectedProgram: selectedp, programselected: true});
            this.props.onSelectedProgramChange(selectedp);
        }
    }

    handleGetPrograms =(showLoading,selectindex)=>{
        if(showLoading){
            Services.ServiceAlert.AlertService.info(Services.i18n.t('loading'), {autoClose: false,keepAfterRouteChange:false});
        }
        this.setState({isLoading: true});
        Services.Programs.getPrograms()
        .then((data=>{
            this.setState({Programs: data.programs, isLoading:false});
            if(selectindex>-1){
                this.handleSelect(selectindex);
            }
            if(showLoading){
                Services.ServiceAlert.AlertService.clear();
            }
        }))
        .catch((error => { 
            Services.ServiceAlert.AlertService.clear();
            Services.ServiceAlert.AlertService.error(Services.i18n.t('program.error.getting'), this.state.options);
            console.error('There was an error!', error);
        }));
    }

    componentDidMount(){
        this.handleGetPrograms(true,-1);
    }

    render() {
    const DropDownTitleValue=this.state.SelectedProgram === '' ? Services.i18n.t('program.select') : this.state.SelectedProgram.NAME;
    const Programs = this.state.Programs;

    var list;

    // if(this.state.isLoading ){
    //     return (<LoadingFrame/>);
    // }

    if(Programs!==undefined && !this.state.isLoading){
        list= Programs.map((item) =>{ 
            const description= (item.DATA!=null && item.DATA.Description!=null) ? item.DATA.Description : item.NAME;
            return (   
                
                <Dropdown.Item id={item.ID} eventKey={item.ID} title={description} aria-label={item.ID}>{item.NAME}</Dropdown.Item>
            );      
        });
    }
    else{
        list= null;
    }
        
    return (
        <div>
            <ButtonGroup>
                <DropdownButton justified="true"
                    title={DropDownTitleValue}
                    onSelect={this.handleSelect}
                    focusFirstItemOnShow="keyboard"
                    as={ButtonGroup}
                    id="dropdown-programs"
                    className="mr-2"
                    ref={this.ref}
                >
                    {list}
                </DropdownButton>

                <Button className="btn-fermenta mr-2 btn-dropdown" disabled={this.state.isLoading} onClick={this.handleNew}><Icons.NewspaperLine fontSize="1.5em"/><div className="btn-dropdown-text">{Services.i18n.t('program.new')}</div></Button>
                <Button className="btn-fermenta mr-2 btn-dropdown" disabled={!this.state.programselected} onClick={this.handleDelete}><Icons.DeleteBinLine fontSize="1.5em"/><div className="btn-dropdown-text">{Services.i18n.t('program.delete')}</div></Button>
                <Button className="btn-fermenta mr-2 btn-dropdown" disabled={!this.state.programselected} onClick={this.handleStart}><Icons.RunLine fontSize="1.5em"/><div className="btn-dropdown-text">{Services.i18n.t('program.start')}</div></Button>
            </ButtonGroup>
      </div>
    );
  }
}

export default ProgramsDropDown;