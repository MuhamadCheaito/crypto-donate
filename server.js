const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const web3 = require('web3');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) => {
    res.render('\home');
});

app.listen(4000,()=>{
    console.log("listening to port 4000");
});