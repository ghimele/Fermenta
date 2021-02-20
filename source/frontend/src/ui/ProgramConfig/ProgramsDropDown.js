import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class ProgramsDropDown extends React.Component {
    state = { DropDowntitle:'',Programs:'', SelectedProgram:''};

    handleSelect=(e)=>{
        console.log(e);
        var selectedp;
        if(this.props.programs.length>0){
            
            this.props.programs.map(p =>{
                if(p.Id===parseInt(e)){
                    selectedp=p;
                }
            });
        }

        if(selectedp!==undefined){
            this.setState({ DropDowntitle: selectedp.Name });
            this.props.onSelectedProgramChange(selectedp);
        }
    }

    componentDidMount(){
        this.setState({Programs: this.props.programs})
    }

    render() {
    const DropDownTitleValue=this.state.DropDowntitle == '' ? "Select a program" : this.state.DropDowntitle;
    const Programs = this.props.programs;

    var list= Programs.map((item,idx) =>{ 
        return (   
            <Dropdown.Item eventKey={item.Id} title={item.Name}>{item.Name}</Dropdown.Item>
        );      
    });

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