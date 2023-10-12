const express = require('express');
const app = express();
const cors = require('cors');
const env = require('dotenv');
const path = require("path");
const {response} = require("express");
const QRCode = require("qrcode");
env.config();

const Database = require("./database");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

app.use(express.static(path.join(__dirname,'../', '/client')))

// create
app.post('/insert', (req, res) =>{
    const {name} = req.body;

    const db = Database.getInstance();
    const result = db.insertName(name);

    //Log QrCode:
    QRCode.toFile('../out/code.png',"Encode this text in QR code", {
        errorCorrectionLevel : 'H'
    }, function (err) {
        if (err) throw err;
        console.log("QR Code Saved!")
    });

    result.then(data => res.json({success : true}))
        .catch(err => console.log(err));
});
// read
app.get('/getAll', (req, res) => {
    const db = Database.getInstance();

    const result = db.getAllData();

    result.then(data => res.json({data : data}))
        .catch(err => console.log("error in app" +err.message));

});

app.get('/', (req, res) => {
    res.sendFile(__dirname+ "../" + '/public/index.html');
});
// update

// delete

app.listen(process.env.PORT, () => console.log("App is running!"));