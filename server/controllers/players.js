
/* eslint-disable newline-per-chained-call, new-cap, no-param-reassign, consistent-return, no-underscore-dangle, array-callback-return, max-len */

import express from 'express';
import Player from '../models/player';
import bodyValidator from '../validators/players/body';

const router = module.exports = express.Router();

// create
router.post('/', bodyValidator, (req, res) => {
  Player.create(res.locals, (err, player) => {
    res.send({ player });
  });
});
