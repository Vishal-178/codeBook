const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index =async function(req, res){

    let posts =await Post.find({})
        .sort('-createdAt')
        .populate('user').
        populate({
            path:'comment',
            populate:{
                path:'user'
            }
        });

    return res.json(200,{
        message: "List of posts",
        posts:posts
    });
}

module.exports.destroy =async function(req,res){
    //moving into try catch
    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string.
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});   
            

            return res.json(200,{
                message: "Post and Associated comments deleted successfully"
            });
        }else{
            return res.json(401,{
                message: "you cannot delete this post"
            });
        }    
    } catch (err) {
        // req.flash('error',err);
        // console.log(err);
        return res.json(500,{

            message: "internal server error"
        });
    }
    
    
}