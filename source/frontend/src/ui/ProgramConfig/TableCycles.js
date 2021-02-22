import React,{useState} from 'react';
import Table from 'react-bootstrap/Table';
import { RiAddBoxLine,RiDeleteBin2Line,RiArrowUpSFill,RiArrowDownSFill} from "react-icons/ri";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

const tableColProps=[{    
    Id:10,    
    Temperature:"20",    
    Duration:"30",    
    Volume:"0"    
  }]   

class TableCycles extends React.Component {
    state = { tableHeaders:["Cycle", "Temperature", "Duration", "Volume",""],
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
                      if (key == item.name && i == index) {    
                          row[key] = item.value;    
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
                Duration:"0",    
                Volume:"0"   
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
                //this.setState({ rows: newRow});    
                this.state.rows=newRow;
                // this.setState(() => ({
                //     rows: rowsArray.splice(index, 1)
                //   }));
            }    
            this.setState();
        } catch (error) {    
            console.log("Error in React Table handle Remove Row : " + error);    
        }    
    };    

    /* This event will fire on button up change */  
    handleUp = (index,keyname,increment,max) => evt  => {    
        try {        
              var digit=1;
              var rowsArray = this.state.rows; 
              if(Number.isInteger(increment)) {
                  digit=0;
              }  
              var newRow = rowsArray.map((row, i) => {    
                  for (var key in row) {    
                      if (key == keyname && i == index) { 
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
                  return row;    
              });    
              this.setState({ rows: newRow });    
              //this.props.cycleRows=rowsArray;    
        } catch (error) {    
              console.log("Error in React Table handle Up : " + error);    
        }           
    };

    /* This event will fire on button Down change */  
    handleDown = (index,keyname,increment,min) => evt  => {    
        try {        
              var digit=1;
              var rowsArray = this.state.rows; 
              if(Number.isInteger(increment)) {
                  digit=0;
              }    
              var newRow = rowsArray.map((row, i) => {    
                  for (var key in row) {    
                      if (key == keyname && i == index) {  
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
                  return row;    
              });    
              this.setState({ rows: newRow });       
        } catch (error) {    
              console.log("Error in React Table handle down : " + error);    
        }           
    };

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
                    <td width="10">    
                        <h5>{(idx+1)}</h5>
                    </td>    
    
                    <td> 
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
    
                    <td>
                        <InputGroup className="mb-2 mr-sm-ls-2">
                            <Form.Control 
                                as="input"    
                                type="number"
                                step="30"
                                name="Duration"    
                                value={this.state.rows[idx].Duration}    
                                onChange={this.handleChange(idx)}    
                                id={this.state.rows[idx].Id}    
                                inputMode="decimal"
                                min="0"
                            />  
                            <InputGroup.Append>
                                    <InputGroup.Text>min</InputGroup.Text>
                                    <Button className="btn-fermenta btn-icon" onClick={this.handleUp(idx,"Duration",30,10000000)}><RiArrowUpSFill fontSize="2.25em"/></Button>
                                    <Button className="btn-fermenta btn-icon" onClick={this.handleDown(idx,"Duration",30,0)}><RiArrowDownSFill fontSize="2.25em"/></Button>
                                </InputGroup.Append>
                        </InputGroup>
                    </td>    
                     
                    {
                        this.props.useVolume ? 
                            <td>    
                                <InputGroup className="mb-2 mr-sm-ls-2">
                                    <Form.Control    
                                    type="number"
                                    step="0.1"   
                                    name="Volume"    
                                    value={this.state.rows[idx].Volume}    
                                    onChange={this.handleChange(idx)}    
                                    id={this.state.rows[idx].Id}  
                                    readOnly={!this.props.useVolume} 
                                    inputMode="decimal"
                                    min="0"
                                    max="10"
                                />    
                                    <InputGroup.Append>
                                        <InputGroup.Text></InputGroup.Text>
                                        <Button className="btn-fermenta btn-icon" onClick={this.handleUp(idx,"Volume",0.1,10)}><RiArrowUpSFill fontSize="2.25em"/></Button>
                                        <Button className="btn-fermenta btn-icon" onClick={this.handleDown(idx,"Volume",0.1,0)}><RiArrowDownSFill fontSize="2.25em"/></Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </td> 
                        :
                        null
                    }
                    
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
            if(headerText!=="Volume")  
                return <th> {headerText} </th>
            else if (headerText==="Volume" && this.props.useVolume){
                return <th> {headerText} </th>
            }
            else{
                return null;
            }    
        });
        return (
            <Card>
                <Card.Header>
                <ButtonToolbar aria-label="Toolbar with button groups">
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