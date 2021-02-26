import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class ProgramsDropDown extends React.Component {
    state = { DropDowntitle:'',Programs:this.props.programs, SelectedProgram:''};

    handleSelect=(e)=>{
        console.log(e);
        var selectedp;
        if(this.props.programs.length>0){
            
            this.props.programs.map(p =>{
                if(p.ID===parseInt(e)){
                    selectedp=p;
                }
            });
        }

        if(selectedp!==undefined){
            this.setState({ DropDowntitle: selectedp.NAME });
            this.props.onSelectedProgramChange(selectedp);
        }
    }

    componentDidMount(){
        this.setState({Programs: this.props.programs})
    }

    render() {
    const DropDownTitleValue=this.state.DropDowntitle == '' ? "Select a program" : this.state.DropDowntitle;
    const Programs = this.state.Programs;

    var list;
    if(!this.props.isLoading && Programs!==undefined){
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
            <Dropdown justified
                title={DropDownTitleValue}
                onSelect={this.handleSelect}
                focusFirstItemOnShow="keyboard"
                as={ButtonGroup}
            >
                <Dropdown.Toggle id="dropdown-programs" className="btn-fermenta">{DropDownTitleValue}</Dropdown.Toggle>
                <Dropdown.Menu id="dropdown-programs-menu">
                    <Dropdown.Item eventKey="AddNew"> New Program</Dropdown.Item>
                    <Dropdown.Item eventKey="Remove">Remove Program</Dropdown.Item>
                    <Dropdown.Divider/>
                    {list}
                </Dropdown.Menu>
                
            </Dropdown>
      </div>
    );
  }
}

export default ProgramsDropDown;