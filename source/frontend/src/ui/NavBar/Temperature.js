import  React from 'react'
import Icons from '../../components/utilities/utils.icons';

class Temperature extends React.Component {

    render() {     
        var temp= this.props.data[0];
        return (
            <div className="NavBarTemperature">
                <Icons.TempHotFill/>
                <div>
                    {temp}
                    <Icons.CelsiusLine/>
                </div>
            </div>
        );
    }
}

export default Temperature