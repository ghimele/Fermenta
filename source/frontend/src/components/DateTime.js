import  React, { useState , useEffect } from 'react'

export const DateTime = (props) => {

    var [datetime,setDateTime] = useState("");
    var [label,setLabel] = useState("");
    
    useEffect(() => {
        if(props.datetime!==undefined && props.datetime!==""){
            //create date and time 
            var date = new Date(props.datetime).toLocaleDateString();
            var time = new Date(props.datetime).toLocaleTimeString();
            var value=date + " - " + time;
            setDateTime(value);
        }
        else{
            setDateTime("");
        }

        if(props.label!==undefined && props.label!==""){
            setLabel(props.label);
        }
    });

    return(
        <div className="DateTime">
            {label} {datetime}
        </div>
    )
}

export default DateTime