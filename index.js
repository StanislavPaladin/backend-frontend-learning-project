import express from "express";
import mongoose from 'mongoose';
import router from "./post-scripts/router.js";
import productRouter from "./products-scripts/productRouter.js"
import fileUpload from "express-fileupload";
import nodemailer from "nodemailer";
import authRouter from './auth-scripts//authRouter.js';
import Product from "./products-scripts/product.js"
import Post from "./post-scripts/post.js"



import bodyParser from 'body-parser'
const urlencodedParser = bodyParser.urlencoded({
  extended: false
})

const PORT = 5555;
const DB_URL = `mongodb+srv://Admin:ltcntvgth1@cluster0.nr3hg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express()
app.use(express.json())
app.set('view engine', 'ejs');


/* загрузка файлов */
app.use(express.static('static')) //папка для сохранения картинок
app.use(fileUpload({}))
/*  ednpoints */
app.use('/api', router) //обрабатывает запросы, которые идут после /api  (http://localhost:5000/api/posts   etc.)
app.use('/api', productRouter)
app.use('/auth', authRouter)
app.use('/assets', express.static('assets')); //здесь статические файлы (js/css etc)


//обработка запросов 
app.post('/search', urlencodedParser, async function (req, res) {
  const query = JSON.parse(JSON.stringify(req.body));
  const queryToString = Object.values(query).toString();
  await Product.find({
    'title': new RegExp(queryToString, 'i')
  }, async function (err, results) {
    await Post.find({
      'title': new RegExp(queryToString, 'i')
    }, function (err, postResults) {
      return res.status(200).json({
        results: results,
        postResults: postResults
      });
    });

  });

});


app.get('/', async function (req, res) {
  const products = await Product.find();
  const news = await Post.find().sort({
    date: -1
  }).limit(3);
  res.render('mainSections/index.ejs', {
    data: '/assets/img/test-img.jpg',
    active: '',
    news: news,
    products: products,
    icon: 'fas fa-user',
    results: ''
  });
})

app.get('/products', async function (req, res) {
  const products = await Product.find();
  res.render('productsSections/index.ejs', {
    img: '/assets/img/test-img.jpg',
    title: 'Продукты',
    active: 'products',
    products: products,
    productName: ''
  });
})

app.get('/news', urlencodedParser, async function (req, res) {
  const lastPost = await Post.find().sort({
    date: -1
  }).limit(1);
  const news = await Post.find().sort({
    date: -1
  }).limit(3);
  res.render('newsListSections/index.ejs', {
    title: 'Новости',
    active: 'news',
    img: '/assets/img/test-img.jpg',
    productName: '',
    lastPost: lastPost[0],
    news: news
  });
})
app.get('/about', function (req, res) {
  res.render('aboutSections/index.ejs', {
    img: '/assets/img/test-img.jpg',
    title: 'О нас',
    active: 'about',
    productName: ''
  });
})
app.get('/contacts', function (req, res) {
  res.render('contactsSections/index.ejs', {
    img: '/assets/img/test-img.jpg',
    title: 'Контакты',
    active: 'contacts',
    productName: ''
  });
})
app.get('/news/:id', async function (req, res) {
  const postsTitle = req._parsedOriginalUrl.pathname.split('/')[2];
  const post = await Post.findOne({
    alias: postsTitle
  });
  const title = post.title;
  res.render('newsListSections/newsOne', {
    data: req.body,
    title: 'Новости',
    active: 'news',
    img: '/assets/img/test-img.jpg',
    post: post,
    productName: title
  });
})
app.get('/products/:id', async function (req, res) {
  const productsTitle = req._parsedOriginalUrl.pathname.split('/')[2];
  const product = await Product.findOne({
    alias: productsTitle
  });
  const title = product.title;
  res.render('productsSections/productOne.ejs', {
    img: '/assets/img/test-img.jpg',
    title: 'Продукты',
    active: 'products',
    product: product,
    productName: title
  })
})

app.post('/sendForm', urlencodedParser, async function (req, res) {
  /*   */
  sendContactsFormData(req.body);
})

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    app.listen(PORT, () => console.log('Server startet at port: ' + PORT))
  } catch (e) {
    console.log(e);
  }
}

startApp()

//отправка приветсвенного письма
async function welcomeMessage(data) {
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'psamailtest@yandex.ru',
      pass: 'ltcntvgth12345'
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

//Отправка письма с данными из формы в контактах
async function sendContactsFormData(data) {
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