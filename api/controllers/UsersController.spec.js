const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('../config/database');
const moment = require('moment');
const app = require('../routes');
const User = require('../models/user');
const Event = require('../models/event');
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

  describe('/api/users/:id', () => {
    it('returns user', function(done) {
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
            .get(`/api/users/${user._id}`)
            .then((res) => {
              expect(res.body.user._id).to.eq(user._id.toString());
              expect(res.body.user.reactions[0].value).to.deep.eq(user.reactions[0].value);
              expect(res.body.user.reactions[0]._id).to.eq(user.reactions[0]._id.toString());
              expect(res.body.user.reactions[0].createdAt).to.eq(user.reactions[0].createdAt.toISOString());
              done();
            }).catch(done);
        });
    });
  });

  describe('/api/users/backup', () => {
    beforeEach(function(done) {
      Promise.all([
        (new User({})).save(),
        (new User({})).save(),
        (new User({})).save()
      ]).then(() => { done() });
    });

    it('deletes all users', function(done) {
      chai.request(app)
        .get(`/api/users/backup`)
        .then((res) => {
          Promise.all([
            User.find({}),
            Event.find({})
          ])
            .then(([users, events]) => {
              expect(res.body.success).to.eq("removed users");
              expect(users.length).to.eq(0)
              expect(events.length).to.eq(1)
              done();
            })
            .catch(done)
        });
    });
  });
});
