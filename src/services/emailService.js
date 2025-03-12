const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config();

const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST, // gmail
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

 async function sendEmail(to, subject, body) {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: body
    })
    }

    module.exports = {sendEmail}