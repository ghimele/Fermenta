import  React, { useState , useEffect } from 'react'
import Icons from './utilities/utils.icons';

export const Volume = (props) => {

    var [volume,setVolume] = useState("");
    
    useEffect(() => {
        
    });

    return(
        <div className="align-middle">
            <Icons.Roundcube /> 
            <span> {props.Value} </span>
        </div>
    )
}

export default Volume