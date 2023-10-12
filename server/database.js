/*
    drop table name;
    create table name(id int not null primary key auto_increment, name varchar(30), date DATETIME);
 */
const mysql = require('mysql');
const dotenv = require('dotenv');
const {response} = require("express");
dotenv.config();

let instance = null;

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err => {
    if (err){
        console.log("Error Occured!" +err);
    }
    else{
        console.log("connected!");
    }
}));

class Database{
    static getInstance(){
        return instance ? instance : new Database();
    }

    async getAllData() {
        try{
            const response = await new Promise((resolve, reject) =>{
               const query = 'SELECT * FROM name;';
               connection.query(query,(err, results) =>{
                   if (err) reject(new Error(err.message));
                   resolve(results);
               })
            });
            return response;
        }catch (err){
            console.log("err in getAllData()" +err.message);
        }
    }

     async getFromKey(id){
        try {
            const response = await new Promise((resolve, reject) =>{
                const query = 'SELECT * FROM name WHERE id = ?;';
                connection.query(query,[id],(err, results) =>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);
            //return response;
        }catch (err){
            console.log("err in getFromKey()" +err.message);
        }
    }
    async insertName(name) {
        if (await this.verifyName(name)){
            try{
                const date = new Date();
                const insertId = await new Promise((resolve,reject) => {
                    const  query = "INSERT INTO name(name,date) VALUES (? ,?);";
                    connection.query(query,[name, date] , (err, result) => {
                        if (err) {
                            reject(new Error(err.message));
                        }
                        else{
                            resolve(result.insertId);
                        }

                    });
                });
                //console.log(insertId);
                 return {
                     id: insertId,
                     name: name,
                     date: date
                 };
            }catch (err){
                console.log("err in insertName()" +err.message);
            }
        }
    }

    async verifyName(newName){
        const response = await new Promise((resolve, reject) =>{

            const query = "SELECT * FROM name WHERE name = ?;";
            connection.query(query,[newName], (err, results) =>{
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        if (response.length !== 0){
            console.log("name exists!");
            return false;
        }
        // Return true if name does not exist
        return true;
    }
}

module.exports = Database;