const tokenValidator = require('./token');

module.exports = function getEnsureAuth() {
  return function ensureAuth(req, res, next) {
    const header = req.headers.Authorization || req.headers.authorization;

    tokenValidator.verify(header)
      .then(payload => {
        req.user = payload;
        next();
      })
      .catch(error => {
        console.error('Token error: ', error);
        return next({
          code: 403,
          error: 'Sign in Error. Please try again.'
        });
      });
  };
};