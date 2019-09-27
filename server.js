const mongoose = require("mongoose");
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const ProductsSchema = require('./schemas/Products');
const UsersSchema = require('./schemas/users');
const Products = mongoose.model('Product', ProductsSchema);
const Users = mongoose.model('Users', UsersSchema);
const MONGODB_URL = 'mongodb://@localhost:27017/store';
mongoose.connect(MONGODB_URL, {useNewUrlParser: true}, err => {
    if (err) {
        console.error('[SERVER_ERROR] MongoDB Connection:', err);
        process.exit(1);
    }
    console.info('Mongo connected');
    app.listen(3000, () => {
    console.log('Escutando na porta 3000');
});

});

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.use(express.static('public'));
app.get('/', (req, res) => {
  res.render('index.html');
});
  
app.get('/products', (req, res) => {  
  Products.find((err, obj) => {
      res.render('products.html', {products: obj});
  });
    
});
app.get('/users', (req, res) => {  
  Users.find((err, obj) => {
      res.render('users.html', {users: obj});
  });
  
});
  
app.get('/contact', (req, res) => {
  res.render('contact.html');
});


app.get('/ricardo', (req, res) => {
  res.render('ricardo.html');
});

app.post('/send', (req, res) => {
  var email = 'artur.nzk@gmail.com';
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'senacerechim2019@gmail.com',
      pass: 'senacrserechim'
    }
  });
  const mailOptions = {
    from: 'senacerechim2019@gmail.com',
    to: email,
    subject: 'Hello ' + req.body.name + ' sending e-mail using Node.js',
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
    res.send('ok');
  });
});

app.get('/product/:id', (req, res) => {
  Products.find({"_id": req.params.id }, (err, obj) => {
      if (err) {
        res.render('notfound.html');
      } else {
        const product = obj[0];
        res.render('product.html', {product: product});
      }
  });
});
  
// APIs
app.get('/api/products', (req, res) => {
  res.send(listProducts);
});

app.get('/api/product/:id', (req, res) => {
  const product = listProducts.find((item) => {
    return item.id == req.params.id
  })
  res.send(product);
});

