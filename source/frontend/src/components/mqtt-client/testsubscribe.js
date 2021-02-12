import React, {Component} from 'react';



class Testsubscribe extends React.Component {
   
  render() {
    const dataList = this.props.data.map((d) => <li>{d}</li>);
    const data= this.props.data[0];
    

      return (
        <div>
        {(() => {
          if (!data) {
            return (
              <div>value null</div>
            )
          } else {
            return (
              <div> {data[this.props.field]}</div>
            )
          }
        })()}
      </div>

      );
    }
  }

// Exporting the component
export default Testsubscribe;