import  React, { useState , useEffect } from 'react'
import Icons from './utilities/utils.icons';

export const Temperature = (props) => {

    var [temperature,setTemperature] = useState("");
    
    useEffect(() => {
        
    });

    return(
        <div className="align-middle list-inline" >
            {props.Hot ?
                <span style={{verticalAlign: 'middle'}}><Icons.TempHotLine color="red"/></span> 
                : props.Cold ?
                <span style={{verticalAlign: 'middle'}}><Icons.TempHotLine color="blue"/></span> 
                : <span style={{verticalAlign: 'middle'}}><Icons.TempHotLine /></span> 
            }
            
            <span style={{verticalAlign: 'middle'}}> {props.Value}</span> 
            <span style={{position:'absolute'}}><Icons.CelsiusLine/></span>
        </div>
    )
}

export default Temperature