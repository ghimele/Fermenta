var MessageType;
var Name;
var Value;

class Message {
    constructor(value, mtype = "message", name = "") {
        MessageType = mtype;
        Name = name;
        Value = value;
    }

    set Name(name){
        Name= name;
    }
    get Name(){
        return Name;
    }

    set MessageType(mtype){
        MessageType= mtype;
    }
    get MessageType(){
        return MessageType;
    }

    set Value(value){
        Value= value;
    }
    get Value(){
        return Value;
    }
}

// const Messages ={
//     Message: Message
// };

module.exports = Message;