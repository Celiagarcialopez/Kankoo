const nodemailer = require("nodemailer");

async function main(email, msg, asunto) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "kankoo.app.validation@gmail.com",
      pass: "bzutoskmqqqwwxqc",
    },
  });

  const info = await transporter.sendMail({
    from: '"Aviso de verificación" <kankoo.app.validation@gmail.com>', // sender address
    to: email, // list of receivers
    subject: asunto, // Subject line
    text: msg, // plain text body
    /*  html: "<b>Entra en tu cuenta antes de que pase mucho tiempo y el guía se duerma en los laureles 😪😉 Confirma que está todo correcto para que los usuarios puedan disfrutar cuanto antes de su guía ✈️</b>", // html body */
  });
  console.log("Message sent: %s", info.messageId);
}

module.exports = main;
