import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import {COLORS} from '../../components/utilities/Color';


class RowComponent extends React.Component {
  
  isJSON = (data) => {
    try {
        const item = data.toArra();
        return true;
    } catch (e) {
        return false;
    }
  };

  render() {
    const dataList = this.props.data.map((d) => <li>{d}</li>);
    
    var color=COLORS.green;
    const data=this.props.data[0]
    var rows;
    if(this.props.data[0]!=undefined){
      if(typeof this.props.data[0] == "object"){
        const datanew= Object.entries(this.props.data[0]);
        rows = datanew.map((r) => <tr key={r[0]}><td width="150">{r[0]}</td><td>{r[1]}</td></tr>);
      }
      else {
        rows=<tr><td>{this.props.data[0]}</td></tr>;
      }
    }
    else
    {
      rows = <tr></tr>;
    }
      return (
        <React.Fragment>{rows}</React.Fragment>
        
      );
    }
  }

// Exporting the component
export default RowComponent;