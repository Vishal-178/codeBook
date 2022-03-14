// this is a middleware it help to show notification on the screen
// in file user_controller we create a flash message which displed on login and logout
// in that we pass the message in request so to display message in responce we have to pass theat message in 
// res each time, so we created this middleware to directly use that req.flash to pass in res 
// now import this file in index.js 
module.exports.setFlash = function(req,res,next){
    // middleware fatches messages from flesh from user_controller and set into locals
    res.locals.flash = {
        'success': req.flash('success'),
        'error' : req.flash('error')
    }
    next();
}

//! Note
// we setup the Library connect-flash in index.js
// use flash() after section setup.
// then setup some messages in user_controller.
// and to pass these message to the ejs/html template we created a middleware.(middleware.js)
// middleware fatches messages from flesh from user_controller and set into locals
// import this meiddleware in index.js and use after flash().
// then display in view/layout.