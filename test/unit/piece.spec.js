// /* eslint-disable no-unused-expressions, func-names, no-underscore-dangle */
//
// const expect = require('chai').expect;
// const Piece = require('../../dst/models/piece');
//
//
// describe('Piece', () => {
//   describe('constructor', () => {
//     it('should create a Piece object', (done) => {
//       const piece = new Piece({ color: 'RED',
//                   position: { 0: 0 },
//                   owner: '57869c0d33d5ed052446aad1', isKing: false });
//       piece.validate(err => {
//         expect(err).to.be.undefined;
//         expect(piece._id).to.be.ok;
//         expect(piece.dateCreated).to.be.ok;
//         done();
//       });
//     });
//     it('should not create a Player object - missing position', (done) => {
//       const piece = new Piece({ color: 'RED',
//                   owner: '57869c0d33d5ed052446aad2', isKing: false });
//       piece.validate(err => {
//         expect(err).to.be.ok;
//         done();
//       });
//     });
//     it('should not create a Player object - missing color', (done) => {
//       const piece = new Piece({ position: { 0: 0 },
//                   owner: '57869c0d33d5ed052446aad2', isKing: false });
//       piece.validate(err => {
//         expect(err).to.be.ok;
//         done();
//       });
//     });
//   });
// });
