require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');

const user = require('./routers/user');
const product = require('./routers/product');
const cart = require('./routers/cart');

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  });

app.use('/user', user);
app.use('/product', product);
app.use('/cart', cart);
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
