import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Plot from 'react-plotly.js';
import {COLORS} from '../utilities/Color';
//import COLORS from '../../scss/_export.scss';

class GaugeNumberChart extends React.Component {
  
  render() {
    const dataList = this.props.data.map((d) => <li>{d}</li>);
    
    var color=COLORS.green;

    if(this.props.data[0]>=50 && this.props.data[0]<80)
    {
      color=COLORS.warning;
    }
    else if(this.props.data[0]>=80)
    {
      color=COLORS.danger;
    }
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: this.props.data[0],
        title: { text: this.props.Title },
        type: "indicator",
        mode: "number",
        gauge: { axis: { range: [null, 100], tickmode:"linear",dtick:10},
                 bar: {color: color, line:{color: color, width:0}, thickness: 1},
                 bgcolor: COLORS.secondary,
                 borderwidth: 0,
                 threshold: {
                  line: { color: COLORS.black, width: 2 },
                  thickness: 1,
                  value: this.props.data[0]
                }
               },
        
        number: {suffix: this.props.Suffix, prefix: this.props.Prefix}
      }
    ];
    
    var layout = { width:300,height:100, margin:{l:30,r:30,t:30,b:0, pad:0}, autosize:true};
    
    var config = {responsive: true, displayModeBar: false}

      return (
        <Plot data={data} layout={layout} config={config}></Plot>
      );
    }
  }

// Exporting the component
export default GaugeNumberChart;