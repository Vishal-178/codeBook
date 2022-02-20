const user = require('../models/user');
module.exports.login = function(req,res){
    return res.render('login',{
        title:"Login",
        error:""
    })
}

module.exports.signup =function(req,res){
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

module.exports.auth = function(req,res){
    console.log(req.body);
    user.find({},function(err,item){
        if(err){
            console.log('error while faching data from the data base');
            return;
        }
        for(var i=0;i<item.length;i++){
            if(item[i].email===req.body.email){
                if(item[i].password===req.body.password){
                    return res.redirect('/')
                }
                
                // return login();;
                return res.end('password error')
            }
        }
        return res.end('user not register please registe')
    });
}