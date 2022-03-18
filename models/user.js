//creating schema for user
const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uplodes/users/avatars');

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
    },
    avatar:{
        type:String
    }
    
},{
    // use to update time when any of the data is change and update.
    timestamps:true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  })
// static method
creatSchema.statics.uplodedAvatar = multer({storage: storage}).single('avatar');
creatSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',creatSchema);

module.exports = User;