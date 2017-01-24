const express = require('express');
const morgan = require('morgan');
const auth = require('./routes/auth-router');
const users = require('./routes/users');
const errorHandler = require('./error-handler');

const app = express();

app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    console.log('Header', req.headers['x-forwarded-proto']);
    if(req.headers['x-forwarded-proto'] === 'https') next();
    else res.redirect(`https://${req.hostname}${req.url}`);
  });
}

app.use((req, res, next) => {
  res.set('Access-control-Allow-Origin', '*');
  res.set('Access-control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.static('./public'));

app.use('/auth', auth);
app.use('/users', users);
app.use(errorHandler);

module.exports = app;