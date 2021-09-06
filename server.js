const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');

app.get('/',(req,res) => {
    res.render("\home");
});

app.listen(5000,()=>{
    console.log("listening to port 5000");
});
module.exports = app;