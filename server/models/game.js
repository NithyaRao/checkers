import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  player1: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  player2: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Game', schema);
