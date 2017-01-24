const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const app = require('../lib/app');
const request = chai.request(app);

const user = {
  name: 'user',
  password: 'testPass',
  email: 'email@email.com'
};

const user2 = {
  name: 'user2',
  password: 'testPass',
  email: 'email2@email.com'
};

const user3 = {
  name: 'user3',
  password: 'testPass',
  email: 'email3@email.com'
}

before(done => {
  request
    .post('/auth/signup')
    .send(user2)
    .then(res => {
      assert.isOk(res.body.token);
      done();
    })
    .catch(done);
});

before(done => {
  request
    .post('/auth/signup')
    .send(user3)
    .then(res => {
      assert.isOk(res.body.token);
      done();
    })
    .catch(done);
});

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
  it('should match all users', done => {
    request
      .get('/users/match')
      .then(res => {
        let matches = res.body.matches;
        let givingArray = res.body.givingArray;
        for (var key in matches) {
          assert.notDeepEqual(key, matches[key]);
        }
        assert.equal(Object.keys(matches).length, givingArray.length);     
        done();
      })
      .catch(done);
  });
});