import React from 'react';

class RowComponent extends React.Component {

  render() {

    var rows;
    if(this.props.data[0]!==undefined){
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
    
    return(
      <React.Fragment>{rows}</React.Fragment>
    );
  }
}

// Exporting the component
export default RowComponent;