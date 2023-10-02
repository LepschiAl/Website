const express = require('express');
const app = express();
const cors = require('cors');
const env = require('dotenv');
const path = require("path");
const {response} = require("express");
env.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

app.use(express.static(path.join(__dirname,'../', '/client')))

// create
app.post('/insert', (req, res) =>{

});
// read
app.get('/getAll', (req, res) => {
    res.json({
        success: true
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname+ "../" + '/public/index.html');
});
// update

// delete

app.listen(process.env.PORT, () => console.log("App is running!"));