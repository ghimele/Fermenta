import  React from 'react'
import Icons from '../../components/utilities/utils.icons';
class Humidity extends React.Component {

    render() {     
        var hum= this.props.data[0];
        return (
            <div className="NavBarHumidity">
                <Icons.Humidity/>
                <div>
                    {hum}
                    <Icons.PercentLine/>
                </div>
            </div>
        );
    }
}

export default Humidity