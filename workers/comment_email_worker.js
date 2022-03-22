const queue = require('../config/kue');
const commentMailer = require('../mailers/comments_mailer');


queue.process('emails', 5,function(job,done){
    console.log('emails worker is processing job', job.data);
    commentMailer.newComment(job.data);
});