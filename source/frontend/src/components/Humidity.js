import  React, { useState , useEffect } from 'react'
import Icons from './utilities/utils.icons';

export const Humidity = (props) => {

    var [humidity,setHumidity] = useState(props.Value);
    
    useEffect(() => {
        
    });

    return(
        <div className="align-middle list-inline">
            <span style={{verticalAlign: 'middle'}}><Icons.Humidity /></span> 
            <span style={{verticalAlign: 'middle'}}> {props.Value}</span> 
        </div>
    )
}

export default Humidity