const user = require('../models/user');
module.exports.profile = function(req,res){
    user.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            title:"Profile Page",
            profile_user: user
        });
    });
    
}
//! convert inot async
module.exports.update =async function(req, res){
    // if(req.user.id == req.params.id){
    //     user.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unotherised');
    // }
    if(req.user.id == req.params.id){
        try {
            let User = await user.findByIdAndUpdate(req.params.id);
            user.uplodedAvatar(req,res,function(err){
                if(err){console.log('****Multer Error',err);return res.redirect('back');}
                // console.log(req.file);
                User.name = req.body.name;
                User.email = req.body.email;

                if(req.file){
                    // this is swing the path of the uploaded file into the avatar filed in the user.
                    User.avatar = user.avatarPath + req.file.filename;
                }
                User.save();
                return res.redirect('back');
            });
        } catch (err) {
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash("error", "Unauthorized");
        return res.status(401).send('Unotherised');
    }
}
module.exports.login = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('login',{
        title:"Login",
        error:""
    })
}

module.exports.signup =function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('signup',{
        title:"Signup"
    })
}

module.exports.create = function(req,res){
    if(req.body.password !== req.body.repassword){
        return res.end('password dont match');
    }
    user.findOne({email: req.body.email},function(err,userData){
        if(err){console.log("error while creating user while signup");return}
                
        if(!userData){
            user.create(req.body,(err,userData)=>{
                if(err){console.log("error while creating user while signup");return}
                return res.redirect('/users/login');
            })
        }else{
            return req.redirect('back');
        }
    });
    // user.create(req.body,(err,userData)=>{
    //     if(err){
    //         console.log('error while pushing data to data base');
    //         return;
    //     }
    //     console.log(`****data added sucessfuly****** ${userData}`);
    //     return res.redirect('/users/login');
    // });
}

// auth or section
//* sign in and create a section for the user.
module.exports.auth = function(req,res){
    // 
    req.flash('success', 'Logged in Scuccessfully');
    return res.redirect('/');
}


// signout or destroy session
module.exports.signout = function(req,res){
    req.logout();
    req.flash('success', 'Logged out Scuccessfully');
    return res.redirect('/');
}