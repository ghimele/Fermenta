import React from 'react';
import Table from 'react-bootstrap/Table';
import { RiAddBoxLine,RiDeleteBin2Line,RiArrowUpSFill,RiArrowDownSFill} from "react-icons/ri";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const tableColProps=[{    
    Id:10,    
    Temperature:"20",    
    Duration:"30",    
    Volume:"0"    
  }]   

class TableCycles extends React.Component {
    state = { tableHeaders:["#", "Temperature", "End Cycle", ""],
              rows: this.props.cycleRows };

    /* This event will fire on cell change */  
    handleChange = (index) => evt  => {    
        try {    
                var item = {    
                    id: evt.target.id,    
                    name: evt.target.name,    
                    value: evt.target.value    
                };    
                var rowsArray = this.state.rows;    
                var newRow = rowsArray.map((row, i) => {    
                    for (var key in row) {    
                        if (key === item.name && i === index) {   
                            if(key==="End"){
                                row[key]["Value"] = item.value;
                            } 
                            else{
                                row[key] = item.value;  
                            }  
                        }    
                    }    
                    return row;    
                });    
                this.setState({ rows: newRow });    
        } catch (error) {    
              console.log("Error in React Table handle change : " + error);    
        }           
    };

    /* This event will fire on adding new row */    
    handleAddRow = () => evt => {    
        try {    
            var id = this.state.rows.length+1;    
            const tableColProps = {  
                Id:id,    
                Temperature:"20",    
                End:{
                    Type:"Duration",
                    Value:"60"
                }   
              }    
            this.state.rows.push(tableColProps);    
            this.setState(this.state.rows);       
         } catch (error) {    
             console.log("Error in React Table handle Add Row : " + error)    
         }    
     };    

    /* This event will fire on remove row */    
    handleRemoveRow = (index) => evt => {    
        try {    
             var rowsArray = this.state.rows;    
             if (index >= 0) {     
                var newRow = rowsArray.splice(index, 1);  
   
                this.state.rows = newRow;
            }    
            this.setState();
        } catch (error) {    
            console.log("Error in React Table handle Remove Row : " + error);    
        }    
    };    

    /* This event will fire on button up change */  
    handleUp = (index,keyname,increment,max, subkeyname="") => evt  => {    
        try {        
                var digit=1;
                var rowsArray = this.state.rows; 
                if(Number.isInteger(increment)) {
                    digit=0;
                }  
                var newRow = rowsArray.map((row, i) => {    
                    for (var key in row) {    
                        if (key === keyname && i === index) { 
                            if(subkeyname!==""){
                                if(row[key][subkeyname]==="")
                                {
                                    row[key][subkeyname]=0;
                                }
                                let newvalue= (parseFloat(row[key][subkeyname])+increment).toFixed(digit);
                                if(newvalue<=max){
                                    row[key][subkeyname]=newvalue;
                                }
                            }
                            else{
                                if(row[key]==="")
                                {
                                    row[key]=0;
                                }
                                let newvalue= (parseFloat(row[key])+increment).toFixed(digit);
                                if(newvalue<=max){
                                    row[key] = newvalue; 
                                }
                            }
                        }    
                    }    
                    return row;    
                });    
                this.setState({ rows: newRow });    
              //this.props.cycleRows=rowsArray;    
        } catch (error) {    
              console.log("Error in React Table handle Up : " + error);    
        }           
    };

    /* This event will fire on button Down change */  
    handleDown = (index,keyname,increment,min,subkeyname="") => evt  => {    
        try {        
                var digit=1;
                var rowsArray = this.state.rows; 
                if(Number.isInteger(increment)) {
                    digit=0;
                }    
                var newRow = rowsArray.map((row, i) => {    
                    for (var key in row) {    
                        if (key === keyname && i === index) { 
                            if(subkeyname!==""){
                                if(row[key][subkeyname]==="")
                                {
                                    row[key][subkeyname]=0;
                                }
                                let newvalue= (parseFloat(row[key][subkeyname])-increment).toFixed(digit);
                                if(newvalue>=min){
                                    row[key][subkeyname]=newvalue;
                                }
                            }
                            else{ 
                                if(row[key]==="")
                                {
                                    row[key]=min;
                                }
                                let newvalue= (parseFloat(row[key])-increment).toFixed(1);
                                if(newvalue>=min){
                                    row[key] = newvalue;   
                                } 
                            }
                        }    
                    }    
                    return row;    
                });    
                this.setState({ rows: newRow });       
        } catch (error) {    
              console.log("Error in React Table handle down : " + error);    
        }           
    };

    handleSelectDropDown = (index) => evt  => {    
        console.log(evt);
        console.log(index);
        var rowsArray = this.state.rows; 
        var newRow = rowsArray.map((row, i) => {   
            if (i === index) { 
                row.End.Type= evt;
                row.End.Value=""; 
            }    
            return row;    
        }); 
        this.setState({ rows: newRow });
    }

    /* This event will fire on next properties update */    
    componentWillReceiveProps(nextProps) {    
        try{    
            if (nextProps.cycleRows.length > 0) {    
                this.setState({ rows: nextProps.cycleRows });    
            }else{    
                this.setState({ rows: tableColProps });    
            }    
    
        }catch(error){    
    
            console.log("Error in React Table component will receive props : " + error);    
   
        }            
    }    

    render() {
        var list;
        if(this.state.rows!==undefined){
        list= this.state.rows.map((item,idx) =>{    
            return (    
                <tr id={"row"+this.state.rows[idx].Id}>    
                    <td width="5">    
                        <h5>{(idx+1)}</h5>
                    </td>    
    
                    <td width="250"> 
                        <InputGroup className="mb-2 mr-sm-ls-2">
                            <Form.Control    
                                as="input"
                                type="number"    
                                name="Temperature"    
                                value={this.state.rows[idx].Temperature}    
                                onChange={this.handleChange(idx)}    
                                id={this.state.rows[idx].Id}
                                inputMode="decimal"
                                min="10"
                                size="5"
                                step="0.5"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>°C</InputGroup.Text>
                                <Button className="btn-fermenta btn-icon" onClick={this.handleUp(idx,"Temperature",0.5,50)}><RiArrowUpSFill fontSize="2.25em"/></Button>
                                <Button className="btn-fermenta btn-icon" onClick={this.handleDown(idx,"Temperature",0.5,10)}><RiArrowDownSFill fontSize="2.25em"/></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </td>    
    
                    <td width="400">
                        <Row md="12">     
                            <Col md="4">              
                                <DropdownButton justified="true"
                                    title={this.state.rows[idx].End.Type}    
                                    onSelect={this.handleSelectDropDown(idx)}
                                    focusFirstItemOnShow="keyboard"
                                    as={ButtonGroup}
                                    id="dropdown-CycleType"
                                    className="mr-2"
                                    ref={this.ref}
                                >
                                    <Dropdown.Item className="dropdown-CycleTypeItem" id="Duration" eventKey="Duration" title="Duration" aria-label="Duration">Duration</Dropdown.Item>
                                    <Dropdown.Item className="dropdown-CycleTypeItem" id="Temperature" eventKey="Temperature" title="Temperature" aria-label="Temperature">Temperature</Dropdown.Item>
                                    {this.props.useVolume ? <Dropdown.Item className="dropdown-CycleTypeItem" id="Volume" eventKey="Volume" title="Volume" aria-label="Volume">Volume</Dropdown.Item> : null}
                                </DropdownButton>
                            </Col>
                            <Col md="8" className="align-middle">
                                {this.state.rows[idx].End.Type==="Temperature" ? <span className="font-weight-bold align-middle">is reached</span>
                                    :
                                    <InputGroup className="mb-2 mr-sm-ls-2"> 
                                        <Form.Control 
                                            as="input"    
                                            type="number"
                                            step="30"
                                            name="End"  
                                            value={this.state.rows[idx].End.Value}    
                                            onChange={this.handleChange(idx)}    
                                            id={this.state.rows[idx].ID}    
                                            inputMode="decimal"
                                            min="0"
                                        /> 
                                        <InputGroup.Append>
                                            { this.state.rows[idx].End.Type==="Duration" ? <InputGroup.Text>min</InputGroup.Text> :  null}
                                            { this.state.rows[idx].End.Type==="Duration" ? 
                                                <Button className="btn-fermenta btn-icon" onClick={this.handleUp(idx,"End",30,1000000,"Value")}><RiArrowUpSFill fontSize="2.25em"/></Button>
                                                :
                                                <Button className="btn-fermenta btn-icon" onClick={this.handleUp(idx,"End",0.5,10,"Value")}><RiArrowUpSFill fontSize="2.25em"/></Button>
                                            }
                                            { this.state.rows[idx].End.Type==="Duration" ? 
                                                <Button className="btn-fermenta btn-icon" onClick={this.handleDown(idx,"End",30,0,"Value")}><RiArrowDownSFill fontSize="2.25em"/></Button>
                                                :
                                                <Button className="btn-fermenta btn-icon" onClick={this.handleDown(idx,"End",0.5,0,"Value")}><RiArrowDownSFill fontSize="2.25em"/></Button>
                                            }                                       
                                        </InputGroup.Append>
                                    </InputGroup>
                                }
                            </Col>
                        </Row>
                    </td>    

                    <td>
                        <InputGroup className="mb-2 mr-sm-ls-2">
                            <Button variant="danger" className="btn-fermenta btn-icon" onClick={this.handleRemoveRow(idx)}><RiDeleteBin2Line fontSize="2.25em" /> </Button>
                        </InputGroup>
                    </td>        
                </tr>    
            );    
    
        });  
        }
        var header =  this.state.tableHeaders.map((headerText) => {  
            return <th> {headerText} </th>   
        });
        return (
            <Card>
                <Card.Header>
                <ButtonToolbar aria-label="Toolbar with button groups" className="justify-content-between">
                    <ButtonGroup className="mr-2">
                        <h4>Cycles</h4>
                    </ButtonGroup>
                    <ButtonGroup className="ml-2">
                        <Button id="add-row" className="btn-fermenta" onClick={this.handleAddRow(0)}><RiAddBoxLine fontSize="1.75em"/>Add new Cycle</Button> 
                    </ButtonGroup>    
                </ButtonToolbar>  
                </Card.Header>
                <Table id="CycleTable" striped bordered>    
                    <thead>    
                        <tr>    
                            {header}    
                        </tr>    
                    </thead>    
                    <tbody>    
                        {list}
                    </tbody>    
                </Table> 
            </Card>
        );
    }
}

export default TableCycles;