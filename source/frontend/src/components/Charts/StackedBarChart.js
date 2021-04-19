import React from 'react';
import Plot from 'react-plotly.js';
import COLORS from '../utilities/Color';

class StackedBarChart extends React.Component {
   
  render() {
    const datatoplot=this.props.data[0];
    var trace1;
    var trace2;
    var data;

    if(datatoplot !== undefined)
    {
      trace1 = {
        y: [''],
        x: [datatoplot[this.props.field1]],
        name: this.props.field1,
        type: 'bar',
        text: datatoplot[this.props.field1],
        textposition: 'inside',
        hoverinfo: 'none',
        orientation: 'h',
        marker: {
          color: COLORS.danger
        }
      };
      
      trace2 = {
        y: [''],
        x: [datatoplot[this.props.field2]],
        name: this.props.field2,
        type: 'bar',
        text: datatoplot[this.props.field2],
        textposition: 'inside',
        hoverinfo: 'none',
        orientation: 'h',
        marker: {
          color: COLORS.green
          }
      };
      
      data = [trace1, trace2];     
    }

    
    

    var layout = {
        title: { text: this.props.Title, font:{size:18, color:COLORS.dark}},
        barmode: 'stack',
        bargap: 0,
        width:300,
        height:200, 
        margin:{l:40,r:40,t:50,b:0}, 
        autosize:true, 
        xaxis: {title: 'GB',tickmode:'auto', automargin:true},
        yaxis: {title: '',automargin:true},
        showlegend: false
    };
    
    

    var config = {responsive: true, displayModeBar: false}

    return (
        <Plot data={data} layout={layout} config={config}></Plot>
      );
    }
  }

// Exporting the component
export default StackedBarChart;