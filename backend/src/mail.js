var nodemailer = require('nodemailer');

require('dotenv').config();

var user  = process.env.EMAIL_USER;
var pass = process.env.EMAIL_PASS;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass
    }
})

function sendEmail(to, subject, text) {
    var mailOptions = {
        from: user,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { sendEmail };