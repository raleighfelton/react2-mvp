const { expect } = require('chai');
const io = require('socket.io-client');
const User = require('./models/user');
require('./index.js');
const mongoose = require('./config/database');
const Cleaner = require('database-cleaner')
const dbCleaner = new Cleaner('mongodb')

const options ={
  transports: ['websocket'],
  'force new connection': true
};

describe('socket', function() {
  afterEach(function(done) {
    dbCleaner.clean(mongoose.connection.db, () => {
      done()
    })
  });

  describe('reaction', function() {
    let client1;
    let client2;

    beforeEach(function(done) {
      client1 = io.connect('http://localhost:3000', options);
      client2 = io.connect('http://localhost:3000', options);
      done();
    });

    it('passes', function(done) {
      const expectedReaction = '123';

      client1.on('connect', function(data) {
        client1.emit('reaction', expectedReaction);
        client2.on('reaction', function(data) {
          expect(data).to.eq(expectedReaction);
          done();
        });
      });
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
            .then((storredUser) => {
              expect(emittedUser._id).to.not.eq(undefined);
              expect(emittedUser.connected).to.eq(true);
              expect(emittedUser.avatar).to.not.eq(undefined);
              done();
            }).
            catch(done)
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
              userIds = users.map((user) => { return user._id.toString() });
              connectedUsers.map((user) => {
                expect(userIds).to.include(user._id);
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
