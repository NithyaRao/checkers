
/* eslint-disable newline-per-chained-call, new-cap, no-param-reassign, consistent-return, no-underscore-dangle, array-callback-return, max-len */

import express from 'express';
import Game from '../models/game';
import bodyValidator from '../validators/games/body';
import moveValidator from '../validators/games/move';
import paramsValidator from '../validators/games/params';

const router = module.exports = express.Router();

// create is register a user
router.post('/', bodyValidator, (req, res) => {
  Game.create(res.locals, (err, game) => {
    game.setCurrentPlayer(res.locals.player1);
    res.send({ game });
  });
});

// update
router.put('/:id/move', paramsValidator, moveValidator, (req, res) => {
  Game.findById(req.params.id, (err, game) => {
    if (game) {
      game.move(res.locals.player, res.locals.initPosition, res.locals.destPosition, (err, game) => {
        if (game) {
          res.send({ game });
        } else {
          res.status(400).send({ messages: [err] });
        }
        });
      };
  });
});
