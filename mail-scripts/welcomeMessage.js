import nodemailer from "nodemailer";

export default async function welcomeMessage(data, req, res) {
  
    let transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'psamailtest@yandex.ru',
        pass: 'ltcntvgth12345'
      },
    });
    console.log(data);
    console.log(data.email);
    // send mail with defined transport object
    try{
      let info = await transporter.sendMail({
        from: '"Stanislav Paladin" <psamailtest@yandex.ru>', // sender address
        to: data.email, // list of receivers
        subject: "Hello ", // Subject line
        text: "", // plain text body
        html: `<b>Благодарим за регистрацию!</b><br/><p>Ваш  пароль: ${data.password}</p>`, // html body
      });
      console.log("Message sent: %s", info.messageId);
    }
    catch(e) {
      console.log(e);
      return res.json(400);

    }

  }