import express from "express";
import mongoose from 'mongoose';
import router from "./post-scripts/router.js";
import fileUpload from "express-fileupload";
import nodemailer from "nodemailer";
import authRouter from './auth-scripts//authRouter.js';


import bodyParser from 'body-parser'
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const PORT = 5555;
const DB_URL = `mongodb+srv://Admin:ltcntvgth1@cluster0.nr3hg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express()
app.use(express.json())
app.set('view engine', 'ejs');


/* загрузка файлов */
app.use(express.static('static'))
app.use(fileUpload({}))
/*  ednpoints */ 
app.use('/api', router) //обрабатывает запросы, которые идут после /api  (http://localhost:5000/api/posts   etc.)
app.use('/auth', authRouter)
app.use('/assets', express.static('assets'));



app.get('/', function(req, res) {
    res.render('mainSections/index.ejs', {data: '/assets/img/test-img.jpg',  active: ''});
})
app.get('/products',   function(req, res) {
  res.render('productsSections/index.ejs',  {img:'/assets/img/test-img.jpg', title: 'Продукты', active: 'products'});
})
app.get('/news', urlencodedParser, function(req, res) {  
  res.render('newsListSections/index.ejs', {title: 'Новости', active: 'news', img: '/assets/img/test-img.jpg'});
})
app.get('/about', function(req, res) {
  res.render('aboutSections/index.ejs',  {img:'/assets/img/test-img.jpg', title: 'О нас', active: 'about'});
})
app.get('/contacts',  function(req, res) {
  res.render('contactsSections/index.ejs',  {img:'/assets/img/test-img.jpg', title: 'Контакты', active: 'contacts'});
})
app.get('/posts/:id', function(req, res) {  
  let postId = req._parsedUrl.path.split('/')[2];  /*  не придумал другого способа, как вытянуть id поста */

  res.render('newsListSections/newsOne', {id: postId, data: req.body, title: 'Новости', active: 'news', img: '/assets/img/test-img.jpg'});
  // res.render('newsListSections/newsOne.ejs', {img:'/assets/img/test-img.jpg', title: 'Новости', active: 'news', data: res.data})
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
  
  

