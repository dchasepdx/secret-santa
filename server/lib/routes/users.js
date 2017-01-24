const router = require('express').Router();
const User = require('../models/user');

Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
    j = Math.floor( Math.random() * ( i + 1 ) );
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
};

router
  .get('/match', (req, res, next) => {
    User.find({})
      .select('-password -_id -__v')
      .then(givingArray => {
        givingArray.shuffle();

        const receivingArray = givingArray.map(x => {
          return x;
        });
        let matches = {};

        let randShift = Math.floor(Math.random() * (givingArray.length - 1) + 1);

        let tempArray = receivingArray.splice(receivingArray.length - randShift, randShift);

        for (let i = tempArray.length - 1; i >= 0; i--) {
          receivingArray.unshift(tempArray[i]);
        }

        for (let i = 0; i < givingArray.length; i++) {
          matches[givingArray[i]] = receivingArray[i];
        }

        res.send({givingArray, matches});
      })
      .catch(next);
  });

module.exports = router;