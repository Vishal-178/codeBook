
const Posts = require('../models/post');

module.exports.home = function(req,res){
    // console.log(req.user);
    // Posts.find({user:req.user._id},function(err,posts){
        // console.log("======================");
        // console.log(posts);
        // User.findById(req.user._id,function(err,users){
        //     return res.render('home',{
        //         title:'Home',
        //         posts:posts,
        //         user:users
        //     });
        // });
        
        // Populate the user of each post
        // read mongoose doc for populate and .exec
        Posts.find({})
        .populate('user').
        populate({
            path:'comment',
            populate:{
                path:'user'
            }
        }).
        exec(function(err,posts){
            if(err){console.log("#########---",err);return}
            console.log(typeof(posts))
            return res.render('home',{
                title:'Home',
                posts:posts
            });
        });

    // });
    // return res.render('home',{
    //     title:"home"
    // })
    // return res.end('<h1>express control is running fuin</h1>');
}
