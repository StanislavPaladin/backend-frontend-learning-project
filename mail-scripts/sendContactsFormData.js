export default async function sendContactsFormData(data) {
    let transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'psamailtest@yandex.ru',
        pass: 'ltcntvgth12345'
      },
    });
    console.log(data)
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Stanislav Paladin" <psamailtest@yandex.ru>', // sender address
      to: `<psamailtest@yandex.ru>`, // list of receivers
      subject: "Contact me! ", // Subject line
      text: "", // plain text body
      html: `please contact me! <br/> my name: ${data.name} <br/> my email: ${data.email} <br/> my phone: ${data.phone} <br/> my message: ${data.message}`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  }