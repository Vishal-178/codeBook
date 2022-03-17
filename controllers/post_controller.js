const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.post =async function(req,res){
    try {
        // console.log(req.body);
        // console.log(req.user);
        //! converting into async
        let post = await Post.create({
            content: req.body.post,
            user: req.user._id
        });
        // js/home_posts.js
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: post
                },
                message: "Post published!"
            });
        }
        console.log('post sucess');
        req.flash('success',"Post Published");
        return res.redirect('back');
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');
    }
    
}
//! converting inti async
module.exports.destroy =async function(req,res){
    //moving into try catch
    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string.
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});   
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id : req.params.id
                    },
                    message: "Post and associated comments delted"
                });
            }

            req.flash('success',"Post and associated comments are deleted");
            return res.redirect('back');
        }else{
            req.flash('error',"you cannot delet this post");
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');
    }
    
    
}