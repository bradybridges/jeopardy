// import chai from 'chai';
// import Round from '../src/Round'
// import Game from '../src/Game'
// import data from '../src/data'
// const expect = chai.expect;

// describe('Round', () => {
//   let game;
//   let round;
//   beforeEach( () => {
//     game = new Game(data, ['Kayla','Brady','Allison']);
//     round = new Round();
//   });

//   it.skip('Should be a function', () => {
//     expect(Round).to.be.a('function');
//   });

//   it.skip('Players property should hold 3 instances of Player', () => {
//     expect(round.players.length).to.equal(3)
//     expect(round.players[0]).to.be.an.instanceof(Player)
//     expect(round.players[1]).to.be.an.instanceof(Player)
//     expect(round.players[2]).to.be.an.instanceof(Player)
//   });

//   describe('dailyDouble', () => {
//     //daily double tests
//   });

//   describe('changePlayer', () => {
//     it.skip('Should increment currentPlayer', () => {
//       round.changePlayer()
//       expect(round.currentPlayer).to.equal(1);
//       round.changePlayer()
//       expect(round.currentPlayer).to.equal(2);
//       round.changePlayer();
//       expect(round.currentPlayer).to.equal(0)
//     })
//   });

//   describe('currentClue', () => {
//     expect(round.currentClue().answer).to.equal('The current answer');
//   });

//   describe('checkGuess', () => {
//     it.skip('should increment currentPlayer', () => {
//       round.checkGuess(round.currentGuess);
//       expect(round.currentPlayer).to.equal(1)
//     });

//     it.skip('Should add to score if answer is correct', () => {
//       round.checkGuess(round.currentGuess)
//       expect(round.players[currentPlayer].totalScore).to.equal(100)
//     });

//     it.skip('Should decrement score if incorrect', () => {
//       round.checkGuess(round.currentGuess)
//       expect(round.players[currentPlayer].totalScore).to.equal(-100);
//     });
//   });

//   describe('checkClueArray', () => {
//     round.checkGuess(round.currentGuess);
//     expect(round.checkClueArray().length).to.equal(1);
//     round.checkGuess(round.currentGuess);
//     expect(round.checkClueArray().length).to.equal(0);
//   });

// });