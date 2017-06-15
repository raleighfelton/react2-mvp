const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('../config/database');
const moment = require('moment');
const app = require('../routes');
const User = require('../models/user');
const Cleaner = require('database-cleaner');
const dbCleaner = new Cleaner('mongodb');

chai.use(chaiHttp);

describe('UsersController', () => {
  afterEach(function(done) {
    dbCleaner.clean(mongoose.connection.db, () => {
      done();
    });
  });

  describe('/api/users', () => {
    it('returns users', function(done) {
      new User({
        reaction: 1,
        reactions: [
          {
            value: 1,
            createdAt: moment().valueOf()
          }
        ]
      }).save()
        .then((user) => {
          chai.request(app)
            .get('/api/users')
            .then((res) => {
              expect(res.body.users.length).to.eq(1);
              done();
            }).catch(done);
        });
    });
  });
});
