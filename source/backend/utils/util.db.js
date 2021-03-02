const path = require("path");
const fs = require("fs");
const { version } = require('../package.json');
const utilgeneral = require('./util.general');
const sqliteDB = require('better-sqlite3');

const maindbPath=path.join(__dirname,'..','database', 'main.db');

const maindb= new sqliteDB(maindbPath, { verbose: console.log });

const UPDATE_TABLE_VERSION = maindb.prepare('UPDATE VERSION SET VERSION = ? WHERE ID = 1');
const SELECT_VERSION = maindb.prepare('SELECT * FROM VERSION where ID=1');
const SELECT_PROGRAM = maindb.prepare('SELECT * FROM PROGRAM');

const UPDATE_PROGRAM = maindb.prepare('UPDATE PROGRAM SET NAME=?, DATA=? WHERE ID = ?');
const INSERT_PROGRAM = maindb.prepare('INSERT INTO PROGRAM (NAME,DATA) VALUES(?,?)');
const DELETE_PROGRAM = maindb.prepare('DELETE FROM PROGRAM WHERE ID = ?');

function errorCB(err,data){
    if(err){
        console.log("errorCB: ",data, err);
    }
    return "";
}

function UpdateMainDB(cb){
    try{
            console.log("Main DB path: %s", maindb);
            console.log("Version: %s", version);
            const curr_version=SELECT_VERSION.get();
            console.log("Current Version: %s", curr_version);
            if(curr_version.VERSION!=version){

                switch (curr_version.VERSION){
                        case '0.0.0':
                            updateMainDB0_0_0(errorCB);
                }
            }
    }
    catch(error){
        cb(error);
    }
}


function updateMainDB0_0_0(cb){
    var res;
    
    try{
        console.log('updateMainDB0_0_0');
        const Transaction = maindb.transaction(() => {
        const CREATE_TABLE_PROGRAM = maindb.prepare('CREATE TABLE IF NOT EXISTS PROGRAM (ID INTEGER NOT NULL UNIQUE, NAME TEXT NOT NULL, DATA JSON, PRIMARY KEY("ID" AUTOINCREMENT)');
        CREATE_TABLE_PROGRAM.run();

        res=UPDATE_TABLE_VERSION.run(version);
        });

        Transaction.apply();
    }
    catch(err){
        console.log("Error during updateMainDB0_0_0: %s", err);
        cb(err,"");
    }

}

function GetPrograms(){
    var retval= new Object();
    retval.error=false;
    retval.message="";
    retval.data=null;

    var data;
    try{
        console.log('GetPrograms');
        data=SELECT_PROGRAM.all();
        for(const i in data){
            if(data[i].DATA!=null){
                data[i].DATA=JSON.parse(data[i].DATA);
            }
        }
        console.log(data);
        retval.data=data;
        return retval;
    }
    catch(err){
        console.log("Error during GetPrograms: %s", err);
        retval.error=true;
        retval.message=err.message;
        return retval;
    }
}

function UpdateProgram(ID, DATA){
    var retval= new Object();
    retval.error=false;
    retval.message="";
    try{
        console.log('UpdateProgram');
        console.log("got ID: %d", ID);
        console.log("got DATA: %s", JSON.stringify(DATA.DATA));

        if(utilgeneral.isEmpty(ID)){
            retval.error=true;
            retval.message="ID must not be empty";
            return retval;
        }
        
        const Transaction = maindb.transaction(() => {
            retval.message=UPDATE_PROGRAM.run(DATA.NAME,JSON.stringify(DATA.DATA),ID);
        });

        Transaction.apply();

        console.log(retval);
        return retval;
    }
    catch(err){
        console.log("Error during UpdateProgram: %s", err);
        retval.error=true;
        retval.message=err.message;
        return retval;
    }
}

function AddProgram(DATA){
    var retval= new Object();
    retval.error=false;
    retval.message="";
    try{
        console.log('AddProgram');
        console.log("got DATA: %s", JSON.stringify(DATA.DATA));
        const Transaction = maindb.transaction(() => {
            retval.message=INSERT_PROGRAM.run(DATA.NAME,JSON.stringify(DATA.DATA));
        });

        Transaction.apply();

        console.log(retval);
        return retval;
    }
    catch(err){
        console.log("Error during AddProgram: %s", err);
        retval.error=true;
        retval.message=err.message;
        return retval;
    }
}

function DeleteProgram(ID){
    var retval= new Object();
    retval.error=false;
    retval.message="";
    try{
        console.log('DeleteProgram');
        
        if(utilgeneral.isEmpty(ID)){
            retval.error=true;
            retval.message="ID must not be empty";
            return retval;
        }

        const Transaction = maindb.transaction(() => {
            retval.message=DELETE_PROGRAM.run(ID);
        });

        Transaction.apply();

        console.log(retval);
        return retval;
    }
    catch(err){
        console.log("Error during DeleteProgram: %s", err);
        retval.error=true;
        retval.message=err.message;
        return retval;
    }
}
const db = {
    UpdateMainDB: UpdateMainDB,
    GetPrograms: GetPrograms,
    UpdateProgram: UpdateProgram,
    AddProgram: AddProgram,
    DeleteProgram: DeleteProgram
};

module.exports = db;