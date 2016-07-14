
/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
const cp = require('child_process');
const Game = require('../../dst/models/game');

describe('post /games', () => {
  it('should create a game', (done) => {
    request(app)
    .post('/games')
    .send({ player1: '57869c0d33d5ed052446aad1', player2: '57869c0d33d5ed052446aad2' })
    .end((err, rsp) => {
      expect(err).to.be.null;
      expect(rsp.status).to.equal(200);
      expect(rsp.body.game.__v).to.not.be.null;
      expect(rsp.body.game._id).to.not.be.null;
      expect(rsp.body.game.board.length).to.equal(24);
      done();
    });
  });
  it('should NOT create a game - missing player id ', (done) => {
    request(app)
      .post('/games')
      .send({ })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        expect(rsp.body.messages).to.deep.equal(['"player1" is required']);
        done();
      });
  });
  it('should NOT create a game - invalid Player id ', (done) => {
    request(app)
    .post('/games')
    .send({ player1: '571', player2: '57869c0d33d5ed052446aad2' })
    .end((err, rsp) => {
      expect(err).to.be.null;
      expect(rsp.status).to.equal(400);
      expect(rsp.body.messages[0]).to.contain('fails to match the required pattern');
      done();
    });
  });
});
