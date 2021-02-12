import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Plot from 'react-plotly.js';
import {COLORS} from '../utilities/Color';

class StackedBarChart extends React.Component {
   
  render() {
    const datatoplot=this.props.data[0];
    var color="green";
    var trace1;
    var trace2;
    var data;

    if(datatoplot != undefined)
    {
      trace1 = {
        x: [''],
        y: [datatoplot[this.props.field1]],
        name: this.props.field1,
        type: 'bar',
        text: datatoplot[this.props.field1],
        textposition: 'inside',
        hoverinfo: 'none',
        marker: {
          color: COLORS.danger
        }
      };
      
      trace2 = {
        x: [''],
        y: [datatoplot[this.props.field2]],
        name: this.props.field2,
        type: 'bar',
        text: datatoplot[this.props.field2],
        textposition: 'inside',
        hoverinfo: 'none',
        marker: {
          color: COLORS.green
          }
      };
      
      data = [trace1, trace2];     
    }

    
    var layout = {
        title: this.props.Title,
        barmode: 'stack',
        bargap: 0,
        width:300,
        height:300, 
        margin:{l:40,r:40,t:30,b:30}, 
        autosize:true, 
        xaxis: {title: 'Memory'},
        yaxis: {title: 'GB', domain:[0,10], tickmode:'linear', dtick:'0.5'},
        "showlegend": true
    };
    
    

    var config = {responsive: true, displayModeBar: false}

    return (
        <Plot data={data} layout={layout} config={config}></Plot>
      );
    }
  }

// Exporting the component
export default StackedBarChart;