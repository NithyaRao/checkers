/* eslint-disable no-use-before-define, func-names, no-underscore-dangle */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  winner: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  player1: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  player2: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  board: { type: Schema.Types.Mixed, default:
      [{ x: 1, y: 0, player: 'player1', isKing: false },
      { x: 3, y: 0, player: 'player1', isKing: false },
      { x: 5, y: 0, player: 'player1', isKing: false },
      { x: 7, y: 0, player: 'player1', isKing: false },
      { x: 0, y: 1, player: 'player1', isKing: false },
      { x: 2, y: 1, player: 'player1', isKing: false },
      { x: 4, y: 1, player: 'player1', isKing: false },
      { x: 6, y: 1, player: 'player1', isKing: false },
      { x: 1, y: 2, player: 'player1', isKing: false },
      { x: 3, y: 2, player: 'player1', isKing: false },
      { x: 5, y: 2, player: 'player1', isKing: false },
      { x: 7, y: 2, player: 'player1', isKing: false },
      { x: 0, y: 7, player: 'player2', isKing: false },
      { x: 2, y: 7, player: 'player2', isKing: false },
      { x: 4, y: 7, player: 'player2', isKing: false },
      { x: 6, y: 7, player: 'player2', isKing: false },
      { x: 1, y: 6, player: 'player2', isKing: false },
      { x: 3, y: 6, player: 'player2', isKing: false },
      { x: 5, y: 6, player: 'player2', isKing: false },
      { x: 7, y: 6, player: 'player2', isKing: false },
      { x: 0, y: 5, player: 'player2', isKing: false },
      { x: 2, y: 5, player: 'player2', isKing: false },
      { x: 4, y: 5, player: 'player2', isKing: false },
      { x: 6, y: 5, player: 'player2', isKing: false },
      { x: 0, y: 3, player: '', isKing: false },
      { x: 1, y: 4, player: '', isKing: false },
      { x: 2, y: 3, player: '', isKing: false },
      { x: 3, y: 4, player: '', isKing: false },
      { x: 4, y: 3, player: '', isKing: false },
      { x: 5, y: 4, player: '', isKing: false },
      { x: 6, y: 3, player: '', isKing: false },
      { x: 7, y: 4, player: '', isKing: false },

    ] },
  currentPlayer: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  dateCreated: { type: Date, default: Date.now },
});

schema.methods.setCurrentPlayer = function (player) {
  this.currentPlayer = player._id;
  return true;
};

schema.methods.checkCurrentPlayer = function (player) {
  if (this.currentPlayer === player._id) {
    return true;
  }
  return false;
};

schema.methods.validMove = function (player, pos1, pos2) {
  if (!this.checkCurrentPlayer(player)) {
    return 'Not current Player';
  }
  const temp = this.board.find((entry) => entry.x === pos2.x
    && entry.y === pos2.y && entry.player === '');
  if (temp) {
    if (Math.abs(temp.x * 1 - pos1.x * 1) === 1 && Math.abs(temp.y * 1 - pos1.y * 1) === 1) {
      return null;
    }
  }
  return 'Invalid Move';
};

schema.methods.move = function (player, pos1, pos2, cb) {
  const error1 = this.validMove(player, pos1, pos2);
  if (error1 === null) {
    const curPosIndex = this.board.findIndex((entry) => entry.x === pos1.x
       && entry.y === pos1.y);
    const movePosIndex = this.board.findIndex((entry) => entry.x === pos2.x
       && entry.y === pos2.y);
    this.board[movePosIndex].player = this.board[curPosIndex].player;
    this.board[curPosIndex].player = '';
    this.markModified('board');
    this.save((err, game) => {
      cb(null, game);
    });
  } else {
    cb(error1);
  }
};

module.exports = mongoose.model('Game', schema);
