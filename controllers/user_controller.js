const user = require('../models/user');
module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        user.findById(req.cookies.user_id,function(err,userData){
            if(err){console.log("error while find data when login");return}
            
            if(userData){
                return res.render('user_profile',{
                    title:"Profile",
                    user:userData
                })
                
            }else{
                return res.redirect("/users/login");
            }   
        });
    }else{
        return res.redirect("/users/login");
    }
    
}
module.exports.login = function(req,res){
    user.findOne({_id:req.cookies.user_id},(err,userData)=>{
        if(err){console.log("error finding id");return}
        
        if(userData){
            return res.redirect('/users/profile');
        }
        return res.render('login',{
            title:"Login",
            error:""
        })
    });
    
}

module.exports.signup =function(req,res){
    user.findOne({_id:req.cookies.user_id},(err,userData)=>{
        if(err){console.log("error finding id");return}
        
        if(userData){
            return res.redirect('/users/profile');
        }
        return res.render('signup',{
            title:"Signup"
        })
    });
    
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

//* auth or createSection
module.exports.auth = function(req,res){
    // find the user
    user.findOne({email: req.body.email},function(err,userData){
        if(err){console.log("error while finding user in signin");return}
        // handle user found
        if(userData){
            //handle password which don't match
            if(userData.password != req.body.password){
                console.log('error password');
                return res.redirect('back');
            }
            // handle session creation
            console.log('logedin');
            res.cookie('user_id', userData.id);
            console.log(req.cookies);
            return res.redirect('/users/profile')
        }else{
            // handle use not found
            console.log('user not found');
            res.redirect('back');
        }
    });
    

    

    
}


// module.exports.auth = function(req,res){
    
//     console.log(req.body);
//     user.find({},function(err,item){
//         if(err){
//             console.log('error while faching data from the data base');
//             return;
//         }
//         for(var i=0;i<item.length;i++){
//             if(item[i].email===req.body.email){
//                 if(item[i].password===req.body.password){
//                     return res.redirect('/')
//                 }
                
                // return login();;
//                 return res.end('password error')
//             }
//         }
//         return res.end('user not register please registe')
//     });
// }

module.exports.signout = function(req,res){
    res.clearCookie("user_id");
    res.redirect('/users/login');
}