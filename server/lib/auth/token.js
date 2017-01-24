const jwt = require('jsonwebtoken');
const tokenValidator = process.env.APP_SECRET || 'secret-santa';

module.exports = {
  sign(user) {
    return new Promise((resolve, reject) => {
      const payload = {
        id: user._id,
        name: user.name
      };
      jwt.sign(payload, tokenValidator, null, (err, token) => {
        if(err) return reject(err);
        resolve(token);
      });
    });
  },

  verify(token){
    return new Promise((resolve, reject) => {
      jwt.verify(token, tokenValidator, (err, payload) => {
        if(err) return reject({'error': 'Token malformed.'});
        resolve(payload);
      });
    });
  }
};