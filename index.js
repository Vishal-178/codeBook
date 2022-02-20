const express = require("express");
const path = require("path");
const app = express();
const port = 7000;
const bp = require('body-parser')
const cookie = require('cookie-parser');


// after installing and creating mongoose.js file in config
// this help to connect to data base.
const db = require('./config/mongoose')

// after creating schema in models folder
// this require to see data base in robo3t or mongocompass
const Contact = require('./models/user');

// use body parser to shaperate data in json formate when we post data from the site.
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//seting cookie parser it help to load cookie from browser.
// and show in json formate.
app.use(cookie());

// layouts after installing express-ejs-layouts
// after installing this use layout file in views folder.
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// extract style and scripts from sub pages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use to go the routhe folder when server call localhost:7000/
app.use('/',require('./routes/router'));

// seting view engin ejs.
app.set('view engine', 'ejs');
// app.set('views',path.join(__dirname,'views'));

// by using express.static we can access any file of the folder directly in the project without using like ./a/b/c
app.use(express.static("assets"));








app.listen(port,(err)=>{
    if(err){
        console.log('error while starting the server');
    }
    console.log(`Server is running fine on port: ${port}`);
});