const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jsforce = require('jsforce');
const path = require('path');
require('dotenv').config();

//----CREATE APP INSTANCE-------
const app = express();


//---- MIDDLEWARE CHAINING----
app.use(cors());
app.use(express.json());
app.use(express.static('Public/build'));


//----CONNECT TO DATABASE------
// mongoose.connect(process.env.DATABASE);
// const connection = mongoose.connection;
// connection.once('open',()=>console.log("MongoDB connection established successfully"))

//---- SET ROUTES-----
app.use('/salesForce',require('./Router/salesForce'));

//-----salesForce connection --------------------------
const {SF_LOGIN_URL,SF_PASSWORD,SF_USERNAME,SF_TOKEN} = process.env;
const conn  = new jsforce.Connection({
    loginUrl: SF_LOGIN_URL
});
conn.login(SF_USERNAME,SF_PASSWORD+SF_TOKEN,(err,user)=>{
    if(err){
        console.error(err)
    }else{
        console.log("Connected to salesForce");
        app.set('conn',conn);
    }
})


app.get('/*',(req,res) => {
    res.sendFile(path.resolve(__dirname, 'Public', 'build', 'index.html'));
})

// SERVER PORT
const port = process.env.PORT
app.listen(port,() => console.log(`server is running on port ${port}`));
module.exports = app;