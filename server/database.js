const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

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
}))