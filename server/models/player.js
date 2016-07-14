/* eslint-disable no-use-before-define, func-names no-underscore-dangle*/

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, minlength: 2, validate: { validator: duplicatePlayerNameValidator } },
  pieces: { type: Array },
  dateCreated: { type: Date, default: Date.now },
});

function duplicatePlayerNameValidator(name, cb) {
  this.model('Player').find({ name }, (err, players) => {
    cb(!players.length);
  });
}

module.exports = mongoose.model('Player', schema);
