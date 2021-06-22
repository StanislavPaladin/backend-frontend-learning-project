import express from "express";
import mongoose from 'mongoose';
import router from "./post-scripts//router.js";
import fileUpload from "express-fileupload";
import nodemailer from "nodemailer";
import authRouter from './auth-scripts//authRouter.js';
// import menu from './front-scripts/menu.js'

import bodyParser from 'body-parser'
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const PORT = 5000
const DB_URL = `mongodb+srv://Admin:ltcntvgth1@cluster0.nr3hg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const app = express()

app.set('view engine', 'ejs');

app.use(express.json())
/* загрузка файлов */
app.use(express.static('static'))
app.use(fileUpload({}))
/*  ednpoints */ 
app.use('/api', router) //обрабатывает запросы, которые идут после /api  (http://localhost:5000/api/posts   etc.)
app.use('/assets', express.static('assets'));
app.use('/auth', authRouter)



app.get('/', function(req, res) {
    res.render('mainSections/index.ejs', {data: '/assets/img/test-img.jpg'});
})

app.post('/about', urlencodedParser, function(req, res) {
    if (!req.body) {return req.status(400)}
      console.log(req.body);
      if (res.statusCode === 200) {
        res.render('./mainSections/main.ejs', {data: req.body});
        // main(req.body).catch(console.error);
      }
}) 

app.post('/post', urlencodedParser, function(req, res) {
  if (!req.body) {return req.status(400)}
    console.log(req.body);
    if (res.statusCode === 200) {
      res.render('about-success', {data: req.body});
      
    }
}) 

app.get('/404', urlencodedParser, function(req, res) {
    res.render('404');
}) 


async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology:true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('Server startet at port: ' + PORT))
    } catch (e) {
        console.log(e);
    }
}

startApp()


async function main(data) {
    let transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'psamailtest@yandex.ru', // generated ethereal user
        pass: 'ltcntvgth1' // generated ethereal password
      },
    });
    console.log(data.email);
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Stanislav Paladin" <psamailtest@yandex.ru>', // sender address
      to: data.email, // list of receivers
      subject: "Hello ", // Subject line
      text: "", // plain text body
      html: `<b>Благодарим за регистрацию!</b><br/><p>Ваш  пароль: ${data.password}</p>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  }
  
  

