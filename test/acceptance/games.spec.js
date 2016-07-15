
/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
const cp = require('child_process');
// const Game = require('../../dst/models/game');

describe('post /games', () => {
  beforeEach((done) => {
  // run command script
    cp.execFile(`${__dirname}/../scripts/populate.sh`, { cwd: `${__dirname}/../scripts` }, (err, out, misc) => {
        done();
    });
  });

  it('should create a game', (done) => {
    request(app)
    .post('/games')
    .send({ player1: '57869c0d33d5ed052446aad1', player2: '57869c0d33d5ed052446aad2' })
    .end((err, rsp) => {
      expect(err).to.be.null;
      expect(rsp.status).to.equal(200);
      expect(rsp.body.game.__v).to.not.be.null;
      expect(rsp.body.game._id).to.not.be.null;
      expect(rsp.body.game.board.length).to.equal(32);
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
describe('put /games/:id/move', () => {
  it('should allow current player to move', (done) => {
    request(app)
      .put('/games/57891fc4691a3a2c38ae59d9/move')
      .send({ player: '57869c0d33d5ed052446aad1', initPosition: { x: 3, y: 2 }, destPosition: { x: 4, y: 3 } })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.game.board.length).to.equal(32);
        expect(rsp.body.game.board[0].player).to.equal('player1');
        expect(rsp.body.game.board[9].player).to.equal('');
        done();
      });
  });
  it('should not allow current player to move - Invalid move', (done) => {
    request(app)
      .put('/games/57891fc4691a3a2c38ae59d9/move')
      .send({ player: '57869c0d33d5ed052446aad1', initPosition: { x: 1, y: 2 }, destPosition: { x: 0, y: 5 } })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        expect(rsp.body.messages[0]).to.equal('Invalid Move');
        done();
      });
  });
});
