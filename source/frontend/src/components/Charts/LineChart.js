import React from 'react';
import Plot from 'react-plotly.js';
import {COLORS} from '../utilities/Color';


class LineChart extends React.Component {
  state = {data: '', layout: '', frames: '', config: ''};
 
  constructor(props){
    super(props);
    //let self = this;

    this.state={data: this.props.data, layout: this.props.layout, frames: this.props.frames, config: this.props.config }
  }

  componentDidMount()
  {
    let self = this;
    if(this.props.update>0){
      setInterval(function(){
        if(self.state.data[0].x.length<self.props.data[0].x.length){
          //console.log("update data: "+ self.props.data[0].x.length);
          self.state.data=self.props.data;
        }
      }, this.props.update*1000);
    }
  }



  handleInitialized(figure){

    //console.log("LineChart intitialized");
  }
  handleUpdate(figure){
    //console.log("LineChart updated");
    // figure.layout.
    
  }

  

  render() {  
      return (
        <Plot
        data={this.state.data}
        layout={this.state.layout}
        frames={this.state.frames}
        config={this.state.config}
        onInitialized={this.handleInitialized}
        onUpdate={this.handleUpdate}
      />
      );
    }
  }

// Exporting the component
export default LineChart;