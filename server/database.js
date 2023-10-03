const mysql = require('mysql');
const dotenv = require('dotenv');
const {response} = require("express");
dotenv.config();

let instance = null;

const connection = mysql.createConnection({
    /*host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DB_PORT*/

    host: 'localhost',
    user: 'website',
    password: 'test123',
    database: 'website',
    port: '3306'
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
               const query = 'select * from name;';
               connection.query(query,(err, results) =>{
                   if (err) reject(new Error(err.message));
                   resolve(results);
               })
            });
            return response;
        }catch (err){
            console.log("error!" +err.message);
        }
    }
}

module.exports = Database;