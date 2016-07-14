/* eslint-disable no-unused-expressions, func-names, no-underscore-dangle */

const expect = require('chai').expect;
const Game = require('../../dst/models/game');

describe('Game', () => {
  describe('constructor', () => {
    it('should create a Game object with two players ', (done) => {
      const game = new Game();
      game.validate(err => {
        expect(err).to.be.undefined;
        expect(game._id).to.be.ok;
        expect(game.dateCreated).to.be.ok;
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
