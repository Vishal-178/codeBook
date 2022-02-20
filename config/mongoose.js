// require the library
const mongoose = require('mongoose');

// connect to the database and naming the data base.
mongoose.connect('mongodb://localhost/codeBook_development');

// aquire the connection to check if it is sucessful
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console,'error connecting to db'));

// up and running then print the sucess message.
db.once('open', function(){
    console.log("sucessfully connected to the data base");
});