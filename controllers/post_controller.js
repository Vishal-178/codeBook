const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.post =async function(req,res){
    // console.log(req.body);
    // console.log(req.user);
    //! converting into async
    let post = await Post.create({
        content: req.body.post,
        user: req.user._id
    });
    return res.redirect('back');
}
//! converting inti async
module.exports.destroy =async function(req,res){
    let post = await Post.findById(req.params.id);
    // .id means converting the object id into string.
    if(post.user == req.user.id){
        post.remove();
        Comment.deleteMany({post: req.params.id});   
    }
    return res.redirect('back');
    
}