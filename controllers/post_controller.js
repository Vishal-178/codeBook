const Post = require('../models/post');
module.exports.post = function(req,res){
    // console.log(req.body);
    // console.log(req.user);
    Post.create({
        content: req.body.post,
        user: req.user._id
    },function(err,post){
        if(err){console.log('error in creating a post');return}
        return res.redirect('back');
    });
}