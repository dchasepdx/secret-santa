const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const app = require('../lib/app');
const request = chai.request(app);

const user = {
  name: 'test',
  password: 'testPass',
  email: 'email@email.com'
};

describe('test initial setup', () => {
  it('should work', () => {
    assert.isOk(true);
  });
});

describe('auth routes', () => {
  it('should sign a user up', done => {
    request
      .post('/auth/signup')
      .send(user)
      .then(res => {
        assert.isOk(res.body.token);
        done();
      })
      .catch(done);
  });
});

describe('match users', () => {
  it('should create 2 arrays of users', done => {
    request
      .get('/users/match')
      .then(res => {
        const givingArray = res.body.givingArray;
        const receivingArray = res.body.receivingArray;
        assert.isArray(givingArray);
        assert.isArray(receivingArray);
        assert.deepEqual(givingArray, receivingArray);
        done();
      })
      .catch(done);
  });
});