const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const { register, login } = require('./controllers/auth');


const { PORT = 3012 } = process.env;



const app = express();

mongoose.connect('mongodb://localhost:27017/stop_user', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/signup', register);
app.post('/signin', login);

app.use(auth);
app.use('/posts', require('./routes/posts'));

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
