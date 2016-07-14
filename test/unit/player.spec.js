/* eslint-disable no-unused-expressions, func-names, no-underscore-dangle*/

const expect = require('chai').expect;
const sinon = require('sinon');
const Player = require('../../dst/models/player');


describe('Players', () => {
  beforeEach(() => {
    sinon.stub(Player, 'find').yields(null, []);
  });

  afterEach(() => {
    Player.find.restore();
  });

  describe('constructor', () => {
    it('should create a Player object', (done) => {
      const player = new Player({ name: 'P1' });
      player.validate(err => {
        expect(err).to.be.undefined;
        expect(player.name).to.be.equal('P1');
        expect(player._id).to.be.ok;
        expect(player.dateCreated).to.be.ok;
        done();
      });
    });
    it('should not create a Player object - Name min length 2', (done) => {
      const player = new Player({ name: 'N' });
      player.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a Player object - Player Name exists', (done) => {
      Player.find.yields(null, [{ name: 'P1' }]);
      const player = new Player({ name: 'P1' });
      player.validate(err => {
        expect(err).to.be.ok;
        sinon.assert.calledWith(Player.find, { name: 'P1' });
        done();
      });
    });
    // it('should create a Player object with pieces', (done) => {
    //   const player = new Player({ name: 'P1',
    //         pieces: [{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 0, y: 4 }, { x: 0, y: 6 },
    //                 { x: 1, y: 1 }, { x: 1, y: 3 }, { x: 1, y: 5 }, { x: 1, y: 7 },
    //                 { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 6 }],
    //                 });
    //   player.validate(err => {
    //     expect(err).to.be.undefined;
    //     expect(player.name).to.be.equal('P1');
    //     expect(player._id).to.be.ok;
    //     expect(player.dateCreated).to.be.ok;
    //     done();
    //   });
    // });
  });
});

// pieces: [{ 0: 0 }, { 0: 2 }, { 0: 4 }, { 0: 6 },
//                                 { 1: 1 }, { 1: 3 }, { 1: 5 }, { 1: 7 },
//                                 { 2: 0 }, { 2: 2 }, { 2: 4 }, { 2: 6 },
//                                 { 1: 7 }, { 3: 7 }, { 5: 7 }, { 7: 7 },
//                                 { 0: 6 }, { 2: 6 }, { 4: 6 }, { 6: 6 },
//                                 { 1: 5 }, { 3: 5 }, { 5: 5 }, { 5: 7 },
//                       ],
