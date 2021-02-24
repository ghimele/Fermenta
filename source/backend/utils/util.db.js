const path = require("path");
const fs = require("fs");
const { version } = require('../package.json');
const sqliteDB = require('better-sqlite3');

const maindbPath=path.join(__dirname,'..','database', 'main.db');

const maindb= new sqliteDB(maindbPath, { verbose: console.log });

const UPDATE_TABLE_VERSION = maindb.prepare('UPDATE VERSION SET VERSION = ? WHERE ID = 1');
const SELECT_VERSION = maindb.prepare('SELECT * FROM VERSION where ID=1');
const SELECT_PROGRAM = maindb.prepare('SELECT * FROM PROGRAM');

let sqlSelectVersion='SELECT * FROM VERSION where ID=?';
let sqlDeleteMenu='DELETE FROM MENU WHERE BUSINESSID=';
let sqlInsertMenu='INSERT INTO MENU(BUSINESSID,NAME,ACTIVE,ROW_INDEX) ';
let sqlUdateMenu='UPDATE MENU ';
let sqlGetMenuItem='SELECT * FROM MENU WHERE BUSINESSID=? AND ID=?';


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
    var res;
    
    try{
        console.log('GetPrograms');
        res=SELECT_PROGRAM.all();
        console.log(res);
        return res;
    }
    catch(err){
        console.log("Error during GetPrograms: %s", err);
        cb(err,"");
    }
}

const db = {
    UpdateMainDB: UpdateMainDB,
    GetPrograms:GetPrograms
};

module.exports = db;