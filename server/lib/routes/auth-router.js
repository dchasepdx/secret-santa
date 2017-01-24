const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const token = require('../auth/token');
// const ensureToken = require('../auth/ensure-token')();

router
  .post('/signup', bodyParser, (req, res, next) => {
    const {email, password} = req.body;
    delete req.body.password;
    console.log('in the sign up route');

    User.find({email})
      .count()
      .then(count => {
        if(count > 0) throw {
          code: 400,
          error: `User ${name} already exists`
        };
        const user = new User(req.body);
        user.generateHash(password);
        return user.save();
      })
      .then(user => {
        return token.sign(user);
      })
      .then(token => {
        res.send({token});
      })
      .catch(next);
  })
  
  .post('signin', bodyParser, (req, res, next) => {
    const {email, password} = req.body;
    delete req.body.password;
    User.findOne({email})
      .then(user => {
        if(!user || !user.compareHash(password)) {
          throw {
            code: 400,
            error: 'Invalid name or password'
          };
        }
        return token.sign(user);
      })
      .then(token => res.send({token}))
      .catch(next);
  });

module.exports = router;