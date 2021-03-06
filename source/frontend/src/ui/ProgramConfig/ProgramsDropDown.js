import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {RiNewspaperLine, RiDeleteBinLine} from "react-icons/ri";
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Services from '../../services';
//import LoadingFrame from '../../components/LoadingFrame';

class ProgramsDropDown extends React.Component {
    state = { DropDowntitle:'',Programs:'', SelectedProgram:'', isLoading: true, programselected: false,
    options: {autoClose: true,keepAfterRouteChange:false}};

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
                Temperature:"30",    
                Duration:"60",    
                Volume:0
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
                    Services.ServiceAlert.AlertService.success('New Program created!', this.state.options);
                    this.handleGetPrograms(false,res.message.lastInsertRowid);
                    //this.handleSelect(parseInt(res.message.lastInsertRowid-1));
                }
            }
        }))
        .catch((error => { 
            Services.ServiceAlert.AlertService.error('Error creating new program!', this.state.options);
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
                    Services.ServiceAlert.AlertService.success('Program '+ programName + ' deleted!' , this.state.options);
                    this.handleGetPrograms(false,-1);
                    this.props.onSelectedProgramChange('');
                }
            }))
            .catch((error => {
                Services.ServiceAlert.AlertService.error('Error deleting program!', this.state.options);
                console.error('There was an error!', error);
            }));
        }
    }

    handleSelect=(e)=>{
        console.log(e);
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
            Services.ServiceAlert.AlertService.info("Loading...", {autoClose: false,keepAfterRouteChange:false});
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
            Services.ServiceAlert.AlertService.error('Error getting programs!', this.state.options);
            console.error('There was an error!', error);
        }));
    }

    componentDidMount(){
        this.handleGetPrograms(true,-1);
    }

    render() {
    const DropDownTitleValue=this.state.SelectedProgram === '' ? "Select a program" : this.state.SelectedProgram.NAME;
    const Programs = this.state.Programs;

    var list;

    // if(this.state.isLoading ){
    //     return (<LoadingFrame/>);
    // }

    if(Programs!==undefined && !this.state.isLoading){
        list= Programs.map((item) =>{ 
            const description= (item.DATA!=null && item.DATA.Description!=null) ? item.DATA.Description : item.NAME;
            return (   
                <Dropdown.Item eventKey={item.ID} title={description} aria-label={item.ID}>{item.NAME}</Dropdown.Item>
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
                >
                    {list}
                </DropdownButton>

                <Button className="btn-fermenta mr-2 btn-dropdown" disabled={this.state.isLoading} onClick={this.handleNew}><RiNewspaperLine fontSize="1.5em"/><div className="btn-dropdown-text">New Program</div></Button>
                <Button className="btn-fermenta mr-2 btn-dropdown" disabled={!this.state.programselected} onClick={this.handleDelete}><RiDeleteBinLine fontSize="1.5em"/><div className="btn-dropdown-text">Delete Program</div></Button>
            </ButtonGroup>
      </div>
    );
  }
}

export default ProgramsDropDown;