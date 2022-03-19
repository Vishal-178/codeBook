const express = require("express");
const path = require("path");
const app = express();
const port = 7000;
const bp = require('body-parser')
// after installing and creating mongoose.js file in config
// this help to connect to data base.
const db = require('./config/mongoose')

//creating sessioin
const session = require("express-session");
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportjwt = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');
// use to flash message on the screen.
const flash = require('connect-flash');
// importing middleware from config folder it help to display notification on the screen more comment in middleware.js file.
const custMiddleware = require('./config/middleware');
// after creating schema in models folder
// this require to see data base in robo3t or mongocompass
const Contact = require('./models/user');

var cookies = require("cookie-parser");
app.use(cookies());
const sassMiddleware = require('node-sass-middleware');

app.use(express.static(path.join(__dirname, '/assets')));

// make the uplode path avilavle to the browser.
app.use('/uplodes',express.static(__dirname+ '/uplodes'))

const fs = require("fs");

// const aaa = "./assets/css/home.css";

// fs.unlink(aaa, function (err) {
//   if (err) {
//     console.error("--------->",err);
//   } else {
//     console.log("File removed:", aaa);
//   }
// });

// fs.readdir('./assets/css', function(err,files){
//     for (const file of files) {
//         fs.unlink(path.join('./assets/css', file), err => {
//           if (err) throw err;
//         });
//       }
// });
// by using express.static we can access any file of the folder directly in the project without using like ./a/b/c
// app.use(express.static('assets'));
app.use(sassMiddleware({
    src:'./assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle:'expanded',
    prefix:'/css'
}));
// use body parser to shaperate data in json formate when we post data from the site.
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))



// layouts after installing express-ejs-layouts
// after installing this use layout file in views folder.
const expressLayouts = require('express-ejs-layouts');
const { Cookie } = require("express-session");

// extract style and scripts from sub pages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(expressLayouts);


// seting view engin ejs.
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));



// look for expresss section documention.
// mongo store is used ot store the session cookie in the db
app.use(session({
    name: 'codeBook',
    // TODO change the secret before deployment in production mode
    secret:"blassomething",
    saveUninitialized:false,
    resave: false,
    cookie: {
        maxAge:(1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeBook_development',
        autoRemove: 'disabled'
    })
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash()); // read import comment.
app.use(custMiddleware.setFlash); // read import comment.

// use to go the routhe folder when server call localhost:7000/
app.use('/',require('./routes/router'));

app.listen(port,(err)=>{
    if(err){
        console.log('error while starting the server');
    }
    console.log(`Server is running fine on port: ${port}`);
});

//* Note
// make sure all the content in this file index.js are in order.