/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const request = require('supertest');
const cp = require('child_process' );
const app = require('../../dst/server');

describe('players', () => {

  beforeEach((done) => {
  // run command script
    cp.execFile(`${__dirname}/../scripts/populate.sh`, { cwd: `${__dirname}/../scripts` }, () => {
      done();
    });
  });

  describe('post /players', () => {
    it('should create a player', (done) => {
      request(app)
      .post('/players')
      .send({ name: 'nkr' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.player.__v).to.not.be.null;
        expect(rsp.body.player._id).to.not.be.null;
        expect(rsp.body.player.name).to.equal('nkr');
        done();
      });
    });
    it('should not create a player - missing name', (done) => {
      request(app)
      .post('/players')
      .send({ name: '' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        done();
      });
    });
  });
});
