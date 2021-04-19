
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



const utilgeneral = {
    isEmpty: isEmpty,
    Median: Median,
    removeNAN:removeNAN
};

module.exports = utilgeneral;