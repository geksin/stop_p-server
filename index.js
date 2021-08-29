const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const auth = require('./middlewares/auth');
const { register, login } = require('./controllers/auth');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const Game = require('./models/game');
// const { register } = require('./controllers/auth');

const { PORT = 3012 } = process.env;



const app = express();


// mongoose.connect('mongodb+srv://test:rFIp9UcNKTzK1WzO@cluster0.wqcp7.mongodb.net/mestodb?retryWrites=true&w=majority',{
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// });

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

app.get('/games', (req, res) => {
  Game.find({})
    .then((games) => {
      res.status(201).send({games})
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post('/games', (req, res) => {
  Game.create({
    datastart: req.body.datastart,
    dataend: req.body.dataend,
    gameUsers: [ {userID:req.body.userID, dataUserEnd:req.body.dataUserEnd} ]
    })
    .then((game) => {
      res.status(201).send({game})
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.patch('/games/:id', (req, res) => {
  console.log(req.params.id)
  Game.findOneAndUpdate({_id: req.params.id}, { $push: {gameUsers: [{userID:req.body.userID, dataUserEnd:req.body.dataUserEnd}]} });
  res.send(req.params.id)
    .then((game) => {
      res.status(201).send({game});
    })
    .catch((err) => {
      res.status(400).send(err);
      console.log(err);
    });
});

// { $push: { <field1>: <value1>, ... } }


app.use(express.static(path.join(__dirname, 'public')));


// app.use(auth);
// app.use('/posts', require('./routes/posts'));

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
