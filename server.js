const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


let listProducts = [
  {
    id: 1,
    name: 'Tênis Nike',
    price: 300,
    description: 'Tênis Nike 3.0'
  },
  {
    id: 2,
    name: 'Tênis Adidas',
    price: 400,
    description: 'Tênis Adidas NMD'
  },
  {
    id: 3,
    name: 'Tênis Puma',
    price: 230,
    description: 'Tênis Puma'
  }
];


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
  res.render('products.html', {products: listProducts});
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
  const product = listProducts.find((item) => {
    return item.id == req.params.id
  })
  res.render('product.html', {product: product});
});

app.listen(3000, () => {
  console.log('Escutando na porta 3000');
});
