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

      game.validate(err => {
        expect(err).to.be.undefined;
        expect(game._id).to.be.ok;
        expect(game.board[0].x).to.equal(1);
        expect(game.board[0].player).to.equal('player1');
        expect(game.board[13].x).to.equal(2);
        expect(game.board[13].player).to.equal('player2');
        expect(game.dateCreated).to.be.ok;
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
    it('should be a valid move for current Player ', (done) => {
      const p1 = new Player({ name: 'P1' });
      const p2 = new Player({ name: 'P2' });
      const game = new Game({ player1: p1, player2: p2 });
      game.setCurrentPlayer(p1);
      game.validMove({ x: 1, y: 2 }, { x: 2, y: 3 });
      game.validate(err => {
        expect(err).to.be.undefined;
        done();
      });
    });
    it('should allow current Player to move ', (done) => {
      const p1 = new Player({ name: 'P1' });
      const p2 = new Player({ name: 'P2' });
      const game = new Game({ player1: p1, player2: p2 });
      game.setCurrentPlayer(p1);
      const movePos = game.validMove({ x: 1, y: 2 }, { x: 2, y: 3 });
      if (movePos) {
        game.move({ x: 1, y: 2 }, { x: 2, y: 3 });
      }
      game.validate(err => {
        expect(err).to.be.undefined;
        done();
      });
    });
    it('should not allow current Player to move - Invalid move ', (done) => {
      const p1 = new Player({ name: 'P1' });
      const p2 = new Player({ name: 'P2' });
      const game = new Game({ player1: p1, player2: p2 });
      game.setCurrentPlayer(p1);
      const movePos = game.validMove({ x: 1, y: 2 }, { x: 6, y: 5 });
      if (movePos) {
        game.move({ x: 1, y: 2 }, { x: 2, y: 3 });
      }
      game.validate(err => {
        expect(err).to.be.undefined;
        done();
      });
    });
    it('should allow current Player to jump ', (done) => {
      const p1 = new Player({ name: 'P1' });
      const p2 = new Player({ name: 'P2' });
      const game = new Game({ player1: p1, player2: p2 });
      game.setCurrentPlayer(p1);
      const movePos = game.validMove({ x: 1, y: 2 }, { x: 3, y: 4 });
      if (movePos) {
        game.move({ x: 1, y: 2 }, { x: 3, y: 4 });
      }
      game.validate(err => {
        expect(err).to.be.undefined;
        done();
      });
    });
  });
  // describe('getWinner', () => {
  //   it('should return undefined initially', () => {
  //     const game = new Game();
  //     expect(game.getWinner()).to.equal(undefined);
  //   });
  //   it('returns player one if player two has no pieces', (done) => {
  //     const game = new Game(p1, p2);
  //     expect(game.getWinner()).to.equal(p1);
  //     done();
  //   });
  //   it('returns player two if player one has no pieces', (done) => {
  //     const game = new Game(p1, p2);
  //     expect(game.getWinner()).to.equal(p2);
  //     done();
  //   });
  // });

//   describe('currentPlayer', () => {
//     it('should start as playerOne', (done) => {
//       const game = new Game(playerOne, playerTwo);
//       expect(game.currentPlayer()).to.equal(playerOne);
//       done();
//     });
//   });
//   describe('move', () => {
//     it('should apply to player one', (done) => {
//       // stub/mock players
//       const game = new Game(playerOne, playerTwo);
//       game.move();
//       expect(playerOne.move.calledOnce).to.equal(true);
//       expect(playerTwo.move.called).to.equal(false);
//       done();
//     });
//     it('currentPlayer changes after move is called', (done) => {
//       const game = new Game(playerOne, playerTwo);
//       expect(game.currentPlayer()).to.equal(playerOne);
//       game.move();
//       expect(game.currentPlayer()).to.equal(playerTwo);
//       done();
//     });
//   });
});
