const mongoose = require('mongoose');

const connectSchema = new mongoose.Schema({
    content:{
        type:String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
})

const Comment = mongoose.model('Comment', connectSchema);
module.exports = Comment;