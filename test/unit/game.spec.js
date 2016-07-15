/* eslint-disable no-unused-expressions, func-names, no-underscore-dangle */

const expect = require('chai').expect;
const Game = require('../../dst/models/game');
const Player = require('../../dst/models/player');

describe('Game', () => {
  describe('constructor', () => {
    it('should create a Game object', (done) => {
      const game = new Game();
      game.validate(err => {
        expect(err).to.be.undefined;
        expect(game._id).to.be.ok;
        expect(game.dateCreated).to.be.ok;
        done();
      });
    });
    it('should create a Game with two players', (done) => {
      const p1 = new Player({ name: 'P1' });
      const p2 = new Player({ name: 'P2' });
      const game = new Game({ player1: p1, player2: p2 });
      game.validate(err => {
        expect(err).to.be.undefined;
        expect(game._id).to.be.ok;
        expect(game.dateCreated).to.be.ok;
        done();
      });
    });
  });

  describe('Create a board', () => {
    it('should create a Game board', (done) => {
      const p1 = new Player({ name: 'P1' });
      const p2 = new Player({ name: 'P2' });
      const game = new Game({ player1: p1, player2: p2 });
      game.setCurrentPlayer(p1);
      game.validate(err => {
        expect(err).to.be.undefined;
        expect(game._id).to.be.ok;
        expect(game.board[0].x).to.equal(1);
        expect(game.board[0].player).to.equal('player1');
        expect(game.board[13].x).to.equal(2);
        expect(game.board[13].player).to.equal('player2');
        expect(game.dateCreated).to.be.ok;
        expect(game.currentPlayer).to.equal(p1._id);
        done();
      });
    });
  });
  describe('currentPlayer', () => {
    it('should start as playerOne', (done) => {
      const p1 = new Player({ name: 'P1' });
      const p2 = new Player({ name: 'P2' });
      const game = new Game({ player1: p1, player2: p2 });
      game.validate(err => {
        expect(err).to.be.undefined;
        expect(game.setCurrentPlayer(p1)).to.be.true;
        expect(game.setCurrentPlayer(p2)).to.be.true;
        expect(game.currentPlayer).to.equal(p2._id);
        done();
      });
    });
  });
  describe('Move', () => {
    it('should allow current Player P1 to move ', (done) => {
      const p1 = new Player({ name: 'P1' });
      const p2 = new Player({ name: 'P2' });
      const game = new Game({ player1: p1, player2: p2 });
      game.setCurrentPlayer(p1);
      // const errormove = game.validMove(p1, { x: 1, y: 2 }, { x: 2, y: 3 });
      game.move(p1, { x: 1, y: 2 }, { x: 2, y: 3 }, (error, game1) => {
        game.validate(err => {
          expect(err).to.be.undefined;
          expect(game1._id).to.equal(game._id);
          done();
        });
      });
    });
    it('should not allow current Player P1 to move - Invalid move ', (done) => {
      const p1 = new Player({ name: 'P1' });
      const p2 = new Player({ name: 'P2' });
      const game = new Game({ player1: p1, player2: p2 });
      game.setCurrentPlayer(p1);
      game.move(p1, { x: 1, y: 2 }, { x: 6, y: 5 }, (error, game1) => {
        game.validate(err => {
          expect(err).to.be.undefined;
          expect(error).to.equal('Invalid Move');
          done();
        });
      });
    });
    it('should not allow Player P1 to move - Not current Player ', (done) => {
      const p1 = new Player({ name: 'P1' });
      const p2 = new Player({ name: 'P2' });
      const game = new Game({ player1: p1, player2: p2 });
      game.setCurrentPlayer(p1);
      game.move(p1, { x: 1, y: 2 }, { x: 6, y: 5 }, (error, game1) => {
        game.validate(err => {
          expect(err).to.be.undefined;
          expect(error).to.equal('Invalid Move');
          done();
        });
      });
    });
    it('should allow current Player P2 to move ', (done) => {
      const p1 = new Player({ name: 'P1' });
      const p2 = new Player({ name: 'P2' });
      const game = new Game({ player1: p1, player2: p2 });
      game.setCurrentPlayer(p2);
      game.move(p2, { x: 0, y: 5 }, { x: 1, y: 4 }, (error, game1) => {
        game.validate(err => {
          expect(err).to.be.undefined;
          expect(game1._id).to.equal(game._id);
          done();
        });
      });
    });
    it('should not allow current Player P2 to move - Invalid move', (done) => {
      const p1 = new Player({ name: 'P1' });
      const p2 = new Player({ name: 'P2' });
      const game = new Game({ player1: p1, player2: p2 });
      game.setCurrentPlayer(p2);
      game.move(p2, { x: 0, y: 7 }, { x: 1, y: 6 }, (error, game1) => {
        game.validate(err => {
          expect(err).to.be.undefined;
          expect(error).to.equal('Invalid Move');
          done();
        });
      });
    });
  });
// describe('jump', () => {
// it('should allow current Player to jump ', (done) => {
//   const p1 = new Player({ name: 'P1' });
//   const p2 = new Player({ name: 'P2' });
//   const game = new Game({ player1: p1, player2: p2 });
//   game.setCurrentPlayer(p1);
//   const movePos = game.validMove({ x: 1, y: 2 }, { x: 3, y: 4 });
//   if (movePos) {
//     game.move({ x: 1, y: 2 }, { x: 3, y: 4 });
//   }
//   game.validate(err => {
//     expect(err).to.be.undefined;
//     expect(movePos).to.be.false;
//     done();
//   });
// });
// });
});
