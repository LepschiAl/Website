const express = require('express');
const app = express();
const cors = require('cors');
const env = require('dotenv');

env.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

// create
app.post('/insert', (req, res) =>{

});
// read
app.get('/getAll', (req, res) => {
    console.log("test");
});
// update

// delete

app.listen(process.env.PORT, () => console.log("App is running!"));