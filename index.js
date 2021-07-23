import express from "express";
import mongoose from 'mongoose';
import router from "./post-scripts/router.js";
import productRouter from "./products-scripts/productRouter.js"
import fileUpload from "express-fileupload";

import authRouter from './auth-scripts//authRouter.js';
import Product from "./products-scripts/product.js"
import Post from "./post-scripts/post.js"
import User from "./models/User.js"
import sendContactsFormData from "./mail-scripts/sendContactsFormData.js";




import bodyParser from 'body-parser'
const urlencodedParser = bodyParser.urlencoded({
  extended: false
})

const PORT = 5555;
const DB_URL = `mongodb+srv://Admin:ltcntvgth1@cluster0.nr3hg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express()
app.use(express.json({
  limit: '50mb'
}))
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

app.get('/', async function (req, res) {
  const products = await Product.find();
  const news = await Post.find().sort({
    createdAt: -1
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
    headerImage: '/assets/img/test-img.jpg',
    title: 'Продукты',
    active: 'products',
    products: products,
    productName: ''
  });
})

app.get('/news', urlencodedParser, async function (req, res) {
  const lastPost = await Post.find().sort({
    createdAt: -1
  }).limit(1);
  const news = await Post.find().sort({
    createdAt: -1
  }).limit(3);
  res.render('newsListSections/index.ejs', {
    title: 'Новости',
    active: 'news',
    headerImage: '/assets/img/test-img.jpg',
    productName: '',
    lastPost: lastPost[0],
    news: news
  });
})

app.get('/contacts', function (req, res) {
  res.render('contactsSections/index.ejs', {
    headerImage: '/assets/img/test-img.jpg',
    title: 'Контакты',
    active: 'contacts',
    productName: ''
  });
})


app.get('/about', function (req, res) {
  res.render('aboutSections/index.ejs', {
    headerImage: '/assets/img/test-img.jpg',
    title: 'О нас',
    active: 'about',
    productName: ''
  });
})

app.get('/contacts', function (req, res) {
  res.render('contactsSections/index.ejs', {
    headerImage: '/assets/img/test-img.jpg',
    title: 'Контакты',
    active: 'contacts',
    productName: ''
  });
})

app.get('/news/:id', async function (req, res) {
  const postsTitle = req._parsedOriginalUrl.pathname.split('/')[2];
  try {
    const post = await Post.findOne({
      alias: postsTitle
    });
    if (post) {
      const title = post.title;
      const headerImage = post.headerImage
      console.log(headerImage);
      res.render('newsListSections/newsOne', {
        data: req.body,
        title: 'Новости',
        active: 'news',
        headerImage: '../' + headerImage || '/assets/img/test-img.jpg',
        post: post,
        productName: title
      });
    }

  } catch (e) {
    console.log('error', e);
  }

})


app.get('/products/:id', async function (req, res) {

  try {
    const productsTitle = req._parsedOriginalUrl.pathname.split('/')[2];

    const product = await Product.findOne({
      alias: productsTitle
    });

    if (product) {
      const title = product.title;
      const headerImage = product.headerImage
      res.render('productsSections/productOne.ejs', {
        headerImage: '../' + headerImage || '/assets/img/test-img.jpg',
        title: 'Продукты',
        active: 'products',
        product: product,
        productName: title
      })
    }
  } catch (e) {
    console.log('error', e);
  }

})

/*админка */
app.get('/products-edit/:id', async function (req, res) {
  console.log(req.body);
  try {
    const productsTitle = req._parsedOriginalUrl.pathname.split('/')[2];

    const product = await Product.findOne({
      alias: productsTitle
    });

    if (product) {
      const title = product.title;
      const headerImage = product.headerImage
      res.render('adminSections/changeProduct.ejs', {
        headerImage: '../' + headerImage || '/assets/img/test-img.jpg',
        title: 'Продукты',
        active: 'products',
        product: product,
        productName: title
      })
    }
  } catch (e) {
    console.log('error', e);
  }

})

app.get('/news-edit/:id', async function (req, res) {
  try {
    const postsTitle = req._parsedOriginalUrl.pathname.split('/')[2];
    const post = await Post.findOne({
      alias: postsTitle
    });
    if (post) {
      const title = post.title;
      const headerImage = post.headerImage
      res.render('adminSections/changeNews.ejs', {
        headerImage: '../' + headerImage || '/assets/img/test-img.jpg',
        title: 'Новости',
        active: 'news',
        post: post,
        productName: title
      })
    }
  } catch (e) {
    console.log('error', e);
  }
})




app.delete('/deleteNews/:id', async function (req, res) {
  try {
    const postsTitle = req.body.alias;
    const post = await Post.findOneAndDelete({
      alias: postsTitle
    });
  } catch (e) {
    console.log('error', e);
  }
})

app.delete('/deleteProduct/:id', async function (req, res) {
  try {
    const productsTitle = req.body.alias;
    const product = await Product.findOneAndDelete({
      alias: productsTitle
    });
  } catch (e) {
    console.log('error', e);
  }
})



app.put('/saveNews/:id', async function (req, res) {

  try {
    const postsTitle = req.body.alias;
    const post = await Post.findOne({
      alias: postsTitle
    });
    if (post) {
      const updatedPost = await Post.findByIdAndUpdate(post._id, req.body, {
        new: true
      })
      console.log('success');
      return updatedPost
    }
  } catch (e) {
    console.log('error', e);
  }
})

app.put('/saveProduct/:id', async function (req, res) {
  console.log(req.body);
  return
  try {
    const productsTitle = req.body.alias;
    const product = await Product.findOne({
      alias: productsTitle
    });
    if (product) {
      const updatedProduct = await Product.findByIdAndUpdate(product._id, req.body, {
        new: true
      })
      console.log('success');
      return updatedProduct
    }
  } catch (e) {
    console.log('error', e);
  }
})



app.get('/createPost', function (req, res) {
  console.log(req.body);
  res.render('adminSections/createPost.ejs', {
    headerImage: '/assets/img/test-img.jpg',
    title: 'Создать пост',
    active: '',
    productName: ''
  });
})

app.get('/createProduct', function (req, res) {
  res.render('adminSections/createProduct.ejs', {
    headerImage: '/assets/img/test-img.jpg',
    title: 'Создать продукт',
    active: '',
    productName: ''
  });
})

app.get('/account/:id', async function (req, res) {
  try {
    const name = req._parsedOriginalUrl.pathname.split('/')[2];
    const user = await await User.findOne({
      email: name
    })
    console.log(user);
    if (user) {
      res.render('adminSections/personalAccount.ejs', {
        headerImage: '/assets/img/test-img.jpg',
        title: 'Личный кабинет',
        active: '',
        product: '',
        productName: '',
        user: user,
      })
    } 
  } catch (e) {
    console.log('error', e);
  }
})





/**отправка формы из контактов */
app.post('/sendForm', urlencodedParser, async function (req, res) {
  if (req.body.name !== '' && req.body.email !== '' && req.body.phone !== '' && req.body.message !== '') {
    await sendContactsFormData(req.body);
    return res.status(200).json({
      message: "Форма отправлена, спасибо"
    });
  } else {
    return res.status(400).json({
      message: "Заполните форму полностью"
    });
  }
})

/**поисковая строка */
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


//обработка несуществующего запроса
app.get('*', function (req, res) {
  res.status(404);
  res.render('404/index.ejs', {
    title: '404'
  });
});




async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    app.listen(PORT, () => console.log('Server started at port: ' + PORT))
  } catch (e) {
    console.log(e);
  }
}

startApp()