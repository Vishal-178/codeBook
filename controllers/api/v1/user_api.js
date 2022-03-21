const { cache } = require('ejs');
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
// auth or createSection
// generating the token
module.exports.createSession =async function(req,res){
    try{
        let user =await User.findOne({email:req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message: "Invalid user name or password"
            });
        }
        return res.json(200,{
            message: "Sign in successfull, here is your token please keep it safe",
            data: {
                token: jwt.sign(user.toJSON(), 'codebook', {expiresIn:'100000'})
            }
        })
    }catch(err){
        console.log('*****',err);
        return res.json(500,{
            message: "Internal Server error"
        });
    }
}