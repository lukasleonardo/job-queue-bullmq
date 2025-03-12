const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const logger = require('../config/logger')

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
        logger.info(`Enviando e-mail para: ${to}, Assunto: ${subject}`);
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: body
        })
        logger.info(`E-mail enviado com sucesso para: ${to}`);
    }

    module.exports = {sendEmail}