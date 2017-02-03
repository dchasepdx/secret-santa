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
};

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


describe('auth routes', () => {
  it('should sign a user up', done => {
    request
      .post('/auth/signup')
      .send(user)
      .then(res => {
        assert.isOk(res.body.token);
        user.token = res.body.token;
        done();
      })
      .catch(done);
  });
});

describe('match users', () => {
  it('should get a user\'s profile', done => {
    request
      .get('/users')
      .set('authorization', user.token)
      .then(res => {
        delete user.password;
        assert.deepEqual(res.body, {"email": "email@email.com", "name": "user"});
        done();
      })
      .catch(done);
  });

  it('should match all users', done => {
    request
      .get('/users/match')
      .then(res => {
        let matches = res.body.matches;
        for (var key in matches) {
          assert.notDeepEqual(key, matches[key]);
        }
        done();
      })
      .catch(done);
  });


  it('should save a match to a profile', done => {
    request
      .get('/users')
      .set('authorization', user.token)
      .then(res => {
        assert.isOk(res.body.match);
        done();
      })
      .catch(done);
  });

  it('should error on a second match', done => {
    request
      .get('/users/match')
      .then(() => {
        done('should not be 200');
      })
      .catch(err => {
        assert.equal(err.response.body.error, 'users are already matched');
        done();
      });
  });
});