const { expect } = require('chai');
const io = require('socket.io-client');
const User = require('../models/user');
const Reaction = require('../models/reaction');
require('../index.js');
const mongoose = require('../config/database');
const Cleaner = require('database-cleaner');
const dbCleaner = new Cleaner('mongodb');
const moment = require('moment');
const _ = require('lodash');

const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('socket', function() {
  afterEach(function(done) {
    dbCleaner.clean(mongoose.connection.db, () => {
      done();
    });
  });

  describe('reaction', function() {
    let client1;
    let client2;

    beforeEach(function(done) {
      client1 = io.connect('http://localhost:3000', options);
      client2 = io.connect('http://localhost:3000', options);
      done();
    });

    afterEach(function(done) {
      client1.disconnect();
      client2.disconnect();
      done();
    });

    it('updates that users reactions', function(done) {
      const expectedReaction = 100;
      const newUser = new User();
      const expectedReactionsCount = 5;
      newUser.save()
        .then((savedUser) => {
          client1.on('connect', function() {
            _.times(expectedReactionsCount, (index) => {
              client1.emit(
                'reaction',
                {
                  id: savedUser._id,
                  value: expectedReaction,
                  createdAt: moment().subtract(index, 'd').toISOString()
                }
              );
            });
            client1.on('connected users', function() {
              User.find({ _id: savedUser._id })
                .then(([user]) => {
                  expect(user.reactions.length).to.eq(expectedReactionsCount);
                  expect(user.latestReaction()).to.eq(expectedReaction);
                  done();
                }).catch(done);
            });
          });
        })
        .catch(done);
    });

    it('broadcasts connected users', function(done) {
      const expectedReaction = 99;

      (new User()).save()
        .then(function(user) {
          client1.on('connect', function() {
            client1.emit('reaction', { id: user._id, value: expectedReaction });
            client2.on('connected users', function(connectedUsers) {
              User.find({ connected: true })
                .then((users) => {
                  const userIds = users.map((u) => { return u._id.toString(); });
                  const connectedUsersIds = connectedUsers.map((u) => { return u._id.toString(); });
                  expect(connectedUsersIds).to.deep.eq(userIds);
                  done();
                });
            });
          });
        })
        .catch(done);
    });
  });

  describe('new user', function() {
    let client1;
    let client2;

    beforeEach(function(done) {
      client1 = io.connect('http://localhost:3000', options);
      client2 = io.connect('http://localhost:3000', options);
      done();
    });

    afterEach(function(done) {
      client1.disconnect();
      client2.disconnect();
      done();
    });

    it('emits a new user', function(done) {
      client1.on('connect', function() {
        client1.emit('new user');
        client1.on('new user', function(emittedUser) {
          User.findOne().sort('-created_at')
            .then(() => {
              expect(emittedUser._id).to.not.be.undefined; // not recommended by mocha docs, should change test to something else
              expect(emittedUser.connected).to.eq(true);
              expect(emittedUser.avatar).to.not.be.undefined; // not recommended by mocha docs, should change test to something else
              done();
            })
            .catch(done);
        });
      });
    });

    it('emits connected users', function(done) {
      client1.on('connect', function() {
        client1.emit('new user');
        client1.on('connected users', function() {
          expect('emitted').to.eq('emitted');
        });
        client2.on('connected users', function(connectedUsers) {
          User.find({})
            .then((users) => {
              const userIds = users.map((user) => { return user._id.toString(); });
              connectedUsers.map((user) => {
                return expect(userIds).to.include(user._id);
              });
              done();
            })
            .catch(done);
        });
      });
    });

    it('emits total count of users', function(done) {
      client1.on('connect', function() {
        client1.emit('new user');
        client2.on('users', function(userCount) {
          expect(userCount).to.eq(1);
          done();
        });
      });
    });
  });
});
