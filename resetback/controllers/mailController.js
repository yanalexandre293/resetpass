//controllers/mailController.js

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
        user: 'yanalexandre293@gmail.com', // Seu endereço de email
        pass: 'lers toyn vcpg uzbi' // Sua senha de email (geralmente deve ser uma senha de app para aplicativos)
    }
});

class MailController{
    
    async sendResetMail(req, res){
        const { email } = req.body;

        try {
            const info = await transporter.sendMail({
                from: '"Yan Alexandre" <yanalexandre293@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>http://localhost:3000/pages/resetpass</b>", // html body
            });
            console.log("Message sent: %s", info.messageId);
            console.log('Email enviado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar o email:', error);
            throw error;
        }
    }
}

module.exports = new MailController();