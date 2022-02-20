module.exports.home = function(req,res){
    return res.render('home',{
        title:'Home'
    });
    // return res.end('<h1>express control is running fuin</h1>');
}
