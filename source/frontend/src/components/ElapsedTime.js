import  React, { useState , useEffect } from 'react'

export const ElapsedTime = (props) => {

    var [elapsed, setElapsed] = useState(0);
    var [label, setLabel] = useState(props.label);
    

    useEffect(() => {
        var difference_ms = 0;
        var seconds = 0;
        var minutes = 0;
        var hours = 0;  
        var days = 0;
        var value="";
        if(props.elapsed!==undefined && props.elapsed!==""){
            //take out milliseconds
            
            difference_ms = props.elapsed/1000;
            seconds = Math.floor(difference_ms % 60);
            difference_ms = difference_ms/60; 
            minutes = Math.floor(difference_ms % 60);
            difference_ms = difference_ms/60; 
            hours = Math.floor(difference_ms % 24);  
            days = Math.floor(difference_ms/24);

            value=days + ":" + hours + ":" + minutes + ":" + seconds;
            setElapsed(value);
        }
        else if(props.startdate!==undefined && props.startdate!==""){
            var currdate = new Date().getTime();
            var startdate=new Date(props.startdate).getTime();
            difference_ms= currdate-startdate;

            //take out milliseconds
            difference_ms = difference_ms/1000;
            seconds = Math.floor(difference_ms % 60);
            difference_ms = difference_ms/60; 
            minutes = Math.floor(difference_ms % 60);
            difference_ms = difference_ms/60; 
            hours = Math.floor(difference_ms % 24);  
            days = Math.floor(difference_ms/24);

            value=days + ":" + hours + ":" + minutes + ":" + seconds;
            var timer = setInterval(()=>setElapsed(value), 900 )
            return function cleanup() {
                clearInterval(timer)
            }
        }
        else{
            setElapsed("");
        }

        if(props.label !== undefined && props.label !== ""){
            setLabel(props.label);
        }
    });

    return(
        <div className="ElapsedTime">
            {label} {elapsed}
        </div>
    )
}

export default ElapsedTime