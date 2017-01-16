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

