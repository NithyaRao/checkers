/* eslint-disable no-use-before-define, func-names */
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
    ] },
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Game', schema);
