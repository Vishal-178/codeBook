const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        // now we can use req in down function
        passReqToCallback:true
    },
    function(req,email,password,done){
        // find a user and establish the identity
        User.findOne({email:email}, function(error,userData){
            if(error){
                // console.log("error in finding user --> Passport");
                req.flash('error',err);
                return done(err);
            }
            if(!userData || userData.password != password){
                req.flash('success', "Invalid Username/Password");
                return done(null, false);
            }
            return done(null,userData);
        });
    }
));

// serilized and deserilized authentication.

// serializing the user to decide which key to be keptin the cookies.
passport.serializeUser(function(user, done){
    done(null,user.id);
});

// deserializing the user from the key in the cookies.
passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
        if(err){
            console.log("error in finding user Id --> Passport");
            return done(err);
        }
        return done(null, user);
    });
});

// check if the user is authenticated
// using this as a middle-were this function is created by me not the pasport library predefined library.
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in, then pass on the request to the next function(controlller's actioin)
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/login');
}

// set the user for view

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the section cookie and we are just sending this to the locals for the views.
        res.locals.user = req.user;

    }
    next();
}

module.exports = passport;