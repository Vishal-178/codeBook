
const Posts = require('../models/post');
const Users = require('../models/user');
//! start using async
module.exports.home =async function(req,res){
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
        //! copy past this code below this and using async.
        // Posts.find({})
        // .populate('user').
        // populate({
        //     path:'comment',
        //     populate:{
        //         path:'user'
        //     }
        // }).
        // exec(function(err,posts){
        //     if(err){console.log("#########---",err);return}
        //     // finding user and sending all user on home to display under friend section.
        //     Users.find({},function(err, users){
        //         return res.render('home',{
        //             title:'Home',
        //             posts:posts,
        //             all_users : users
        //         });
        //     });
            
        // });
        try {
            let posts =await Posts.find({})
            .populate('user').
            populate({
                path:'comment',
                populate:{
                    path:'user'
                }
            });
            let users =await Users.find({});
            return res.render('home',{
                title:'Home',
                posts:posts,
                all_users : users
            });
        } catch (err) {
            console.log("Error", err);
            return;
        }
        
    // });
    // return res.render('home',{
    //     title:"home"
    // })
    // return res.end('<h1>express control is running fuin</h1>');
}
