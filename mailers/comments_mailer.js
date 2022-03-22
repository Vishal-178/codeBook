const nodeMaier = require('../config/nodemailer');

//this is another way of exporting a method
exports.newComment = (comment)=>{
    let htmlString = nodeMaier.renderTemplate({comment:comment}, '/comments/new_comment.ejs');
    nodeMaier.transpoter.sendMail({
        from:'hr@codebook.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html:htmlString
    },(err,info)=>{
        if(err){console.log("Error in Sending Mail",err);return;}
        console.log("Message Send Successfully",info);
        return;
    });
}