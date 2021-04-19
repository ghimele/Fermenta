import React from 'react';
import Plot from 'react-plotly.js';
import COLORS from '../utilities/Color';

class GaugeNumberChart extends React.Component {
  
  render() {    
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: this.props.data[0],
        title: { text: this.props.Title,font:{size:18, color:COLORS.dark} },
        type: "indicator",
        mode: "number",
        number: {suffix: this.props.Suffix, prefix: this.props.Prefix}
      }
    ];
    
    var layout = { width:200,height:80, margin:{l:30,r:30,t:30,b:0}, autosize:true};
    
    var config = {responsive: true, displayModeBar: false}

      return (
        <Plot data={data} layout={layout} config={config}></Plot>
      );
    }
  }

// Exporting the component
export default GaugeNumberChart;