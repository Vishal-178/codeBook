const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create =async function(req,res){
    //! adding async code changing this comment into async code.down.
    // Post.findById(req.body.post, function(err,post){
    //     if(err){console.log('error while finding post id in comments_controller',err);return}
    //     if(post){
    //         Comment.create({
    //             content:req.body.content,
    //             post: req.body.post,
    //             user:req.user._id
    //         },function(err,comment){
    //             if(err){console.log('error while saving comment data to db');return}
    //             post.comment.push(comment);
    //             post.save();
    //             return res.redirect('/');
    //         })
    //     }
    // })
    try {
        let post =await Post.findById(req.body.post);
    
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post: req.body.post,
                user:req.user._id
            });
            post.comment.push(comment);
            post.save();
            return res.redirect('/');
        }
    } catch (err) {
        console.log('Error While pushing comment to data base');
        return res.end('sorry we cannot post your comment right now please try after some time.')
    }
    
}

module.exports.destroy =async function(req, res){
    //! converting this code into async 
    // Comment.findById(req.params.id, function(err, comment){
    //     if(comment.user == req.user.id){
    //         let postId = comment.post;
    //         comment.remove();

    //         Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, past){
    //             return res.redirect('back');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    // })
    try {
        let comment =await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            
        }
        return res.redirect('back');
        
    } catch (err) {
        console.log("error while deleting comment",err);
        return res.end("error while deleting the comment");
    }
    
}