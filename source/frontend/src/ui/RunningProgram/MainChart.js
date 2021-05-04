import React from 'react';
import LineChart from '../../components/Charts/LineChart';
import COLORS from '../../components/utilities/Color';
import Services from '../../services';

class MainChart extends React.Component {
  state = { Data: this.props.data}
  // shouldComponentUpdate(nextProps) {
  //   // Rendering the component only if 
  //   // passed props value is changed
  //   if(nextProps.data!==null){


  //     if (nextProps.data.length !== this.state.data.length) {
  //       this.setState({data:nextProps.data});
  //       return true;
  //     } 
  //     else {
  //       return false;
  //     }
  //   }
  // }

  render() {
    var time = [];
    var temp = [];
    var dheight = [];
    var dvolume = [];
    var humidity = [];

    this.state.Data.map((item, idx) => {
      time.push(item.DateTime);
      temp.push(item.Temperature);
      dheight.push(item.DoughHeight);
      dvolume.push(item.DoughVolume);
      humidity.push(item.Humidity);
    });

    var temperature = {
      x: time,
      y: temp,
      type: 'scatter',
      line: { shape: 'spline' },
      name: "Temperature"
    };

    var doughheight = {
      x: time,
      y: dheight,
      type: 'scatterjl',
      line: { shape: 'spline', color: COLORS.third, width: 3 },
      name: "Dough Height"
    };

    var doughvolume = {
      x: time,
      y: dvolume,
      type: 'scatter',
      line: { shape: 'spline' },
      name: "Dough Volume"
    };

    var humidity = {
      x: time,
      y: humidity,
      type: 'scatter',
      line: { shape: 'spline' },
      name: "Humidity",
      yaxis: 'y2',
    };

    var buttons=[
      {
        visible: true,
        step: "day"
      }, 
      {
        visible: true,
        step: "hour"
      }, 
      {
        visible: true,
        step: "minute",
        count: "10"
      },
      {
        visible: true,
        step: "all"
      }
    ];

    var layout = {
      title: Services.i18n.t('doughheight'),
      yaxis: { title: Services.i18n.t('height') +' cm', tickfont: { color: COLORS.dark } },
      autosize: true,
      xaxis: {
        type: 'date', 'tickmode': 'auto',

        rangeselector: {
          visible: true,
          buttons: buttons
        }
      }

    };

    var layout2 = {
      title: Services.i18n.t('temperature') + '/' + Services.i18n.t('humidity'),
      xaxis: { type: 'date', 'tickmode': 'auto' ,
      rangeselector: {
        visible: true,
        buttons: buttons
      }},
      yaxis: { title: Services.i18n.t('temperature')+ ' °C', tickfont: { color: COLORS.dark } },
      yaxis2: {
        title: Services.i18n.t('%humidity'),
        titlefont: { color: COLORS.dark },
        tickfont: { color: COLORS.dark },
        overlaying: 'y',
        side: 'right'
      },
      autosize: true
    };

    var data = [doughheight];
    var data2 = [temperature, humidity];

    var config = { displayModeBar: true, displaylogo: false }

    return (
      <React.Fragment>
        <LineChart data={data} layout={layout} config={config} update={10}/>
        <LineChart data={data2} layout={layout2} config={config} update={10}/>
      </React.Fragment>
    );
  }
}

// Exporting the component
export default MainChart;