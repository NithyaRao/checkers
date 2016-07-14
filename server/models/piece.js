import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  color: { type: String, enum: ['RED', 'BLUE'], required: true },
  position: { type: Object, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  isKing: { type: Boolean },
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Piece', schema);
