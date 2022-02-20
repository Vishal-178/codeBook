//creating schema for user
const mongoose = require('mongoose');

const creatSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    }
    
},{
    // use to update time when any of the data is change and update.
    timestamps:true
});

const User = mongoose.model('user',creatSchema);

module.exports = User;