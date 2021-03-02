import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {RiNewspaperLine, RiDeleteBinLine} from "react-icons/ri";
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Services from '../../services';
import LoadingFrame from '../../components/ProgressBar';

class ProgramsDropDown extends React.Component {
    state = { DropDowntitle:'',Programs:'', SelectedProgram:'', isLoading: true};

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
        var newid='';

        e.preventDefault();

        Services.Programs.newProgram(this.newProgram)
        .then((message=>{
            this.setState({message:message});
            if(message.message.lastInsertRowid){
                this.handleGetPrograms();
                this.handleSelect(message.message.lastInsertRowid-1);
            }
        }))
        .catch((error => {
            console.error('There was an error!', error);
        }));
    }

    handleDelete=(e)=>{
        e.preventDefault();
        if(this.state.SelectedProgram){

            Services.Programs.deleteProgram(this.state.SelectedProgram.ID).then((message=>{
                this.setState({message:message, SelectedProgram:''});
                //alert(message);
                this.handleGetPrograms();
                this.props.onSelectedProgramChange('');
            }))
            .catch((error => {
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
            this.setState({ DropDowntitle: selectedp.NAME,SelectedProgram: selectedp });
            this.props.onSelectedProgramChange(selectedp);
        }
    }

    handleGetPrograms =()=>{
        this.setState({isLoading: true});
        Services.Programs.getPrograms().then((data=>{
            this.setState({Programs: data.programs, isLoading:false});
        }));
    }

    componentDidMount(){
        this.handleGetPrograms();
    }

    render() {
    const DropDownTitleValue=this.state.SelectedProgram == '' ? "Select a program" : this.state.SelectedProgram.NAME;
    const Programs = this.state.Programs;

    var list;

    if(this.state.isLoading ){
        return (<LoadingFrame/>);
    }

    if(Programs!==undefined){
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
                <DropdownButton justified
                    title={DropDownTitleValue}
                    onSelect={this.handleSelect}
                    focusFirstItemOnShow="keyboard"
                    as={ButtonGroup}
                    id="dropdown-programs"
                    className="mr-2"
                >
                    {list}
                </DropdownButton>

                <Button className="btn-fermenta mr-2 btn-dropdown" onClick={this.handleNew}><RiNewspaperLine fontSize="1.5em"/><div className="btn-dropdown-text">New Program</div></Button>
                <Button className="btn-fermenta mr-2 btn-dropdown" onClick={this.handleDelete}><RiDeleteBinLine fontSize="1.5em"/><div className="btn-dropdown-text">Delete Program</div></Button>
            </ButtonGroup>
      </div>
    );
  }
}

export default ProgramsDropDown;