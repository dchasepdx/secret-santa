function errorHandler(err, req, res, next) { //eslint-disable-line
  const code = err.code || 500;
  const message = (code === 500) ? 'Inter Server Error' : err.error;
  console.log(err.message || err.stack);
  res.status(code);
  res.send({error: message});
}

module.exports = errorHandler;