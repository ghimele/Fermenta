
function isEmpty(s){
    if(!s || s.length==0){
        return true;
    }

    return false;
}

function removeNAN(arr = []) {
    return arr.filter( value => !Number.isNaN(value) );
}

const Median = (arr = []) => {
    const sorted = arr.slice().sort((a, b) => {
       return a - b;
    });
    if(sorted.length % 2 === 0){
       return sorted[(sorted.length / 2) - 1];
    }
    else{
       const mid = Math.floor(sorted.length / 2);
       
       return sorted[mid];
    };
};

function DateTimeToString(milliseconds){
    var date;

    date= new Date(milliseconds);

    return date.toLocaleDateString() + "-" + date.toLocaleTimeString();
}

function ElapsedTime(milliseconds){
    var value;

    var difference_ms = milliseconds/1000;
    seconds = Math.floor(difference_ms % 60);
    difference_ms = difference_ms/60; 
    minutes = Math.floor(difference_ms % 60);
    difference_ms = difference_ms/60; 
    hours = Math.floor(difference_ms % 24);  
    days = Math.floor(difference_ms/24);

    value=days + ":" + hours + ":" + minutes + ":" + seconds;
    return value;
}


const utilgeneral = {
    isEmpty: isEmpty,
    Median: Median,
    removeNAN:removeNAN,
    DateTimeToString: DateTimeToString,
    ElapsedTime:ElapsedTime
};

module.exports = utilgeneral;