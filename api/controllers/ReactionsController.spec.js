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

  describe('/api/reactions', () => {
    const expectedReactionsUser1 = [
      { value: 0, createdAt: moment().utc().format() },
      { value: -1, createdAt: moment().subtract(10, 'seconds').utc().format() },
      { value: 1, createdAt: moment().subtract(20, 'seconds').utc().format() },
      { value: 0.5, createdAt: moment().subtract(30, 'seconds').utc().format() }
    ]
    const expectedReactionsUser2 = [
      { value: 0.10, createdAt: moment().utc().format() },
      { value: 1, createdAt: moment().subtract(10, 'seconds').utc().format() },
      { value: -0.245, createdAt: moment().subtract(20, 'seconds').utc().format() },
      { value: 0.5, createdAt: moment().subtract(30, 'seconds').utc().format() }
    ]

    beforeEach((done) => {
      Promise.all([
        User({
          reaction: 1,
          reactions: expectedReactionsUser1,
        }).save(),
        User({
          reaction: -1,
          reactions: expectedReactionsUser2,
        }).save()
      ]).then(() => { done() })
    });

    it('will give all reactions in DB', (done) => {
      chai.request(app)
        .get('/api/reactions')
        .then((res) => {
          expectedReactionsUser1.concat(expectedReactionsUser2).map((expectedReaction) => {
            const reactions = res.body.reactions.map((r) => { return r.value });
            expect(reactions).to.include(expectedReaction.value);
          });
          done()
        })
        .catch(done);
    });
  });
});
