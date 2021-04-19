import  React, { useState , useEffect } from 'react'
import Icons from './utilities/utils.icons';

export const Distance = (props) => {

    var [distance,setDistance] = useState("");
    
    useEffect(() => {
        
    });

    return(
        <div className="align-middle">
            <Icons.OutlineColumnHeight /> 
            <span> {props.Value} </span>
        </div>
    )
}

export default Distance