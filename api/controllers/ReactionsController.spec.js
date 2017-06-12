const { expect } = require('chai');
const chai = require('chai');
const app = require('../routes');
const chaiHttp = require('chai-http');
const Reaction = require('../models/reaction');
const mongoose = require('../config/database');
const Cleaner = require('database-cleaner');
const dbCleaner = new Cleaner('mongodb');

chai.use(chaiHttp);

describe('/api/requests', (done) => {
  afterEach(function(done) {
    dbCleaner.clean(mongoose.connection.db, () => {
      done();
    });
  });

  it('works', (done) => {
    new Reaction().save()
      .then((reaction) => {
        console.log(reaction);
        chai.request(app)
          .get('/api/requests')
          .then((res) => {
            expect(res.body.reactions[0]._id).to.eq(reaction._id.toString());
            done();
          }).catch(done);
      });
  });
});
