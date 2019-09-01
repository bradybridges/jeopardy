import chai from 'chai';
import Round from '../src/Round.js'
import Game from '../src/Game.js'
const expect = chai.expect;

describe('Round', () => {
  let game;
  let round;
  beforeEach( () => {
    game = new Game(//parameters);
    round = new Round(//parameters);
  });

  it('Should be a function', () => {
    //? how to use expect to check class is function
  });

  it('Game property should be instance of Game', () => {
    expect(Round.game).to.be.an.instanceof(Game);
  });

  it('Players property should hold 3 instances of Player', () => {
    expect(round.players.length).to.equal(3)
    expect(round.players[0]).to.be.an.instanceof(Player)
    expect(round.players[1]).to.be.an.instanceof(Player)
    expect(round.players[2]).to.be.an.instanceof(Player)
  });

  describe('dailyDouble', () => {
    //daily double tests
  });

  describe('changePlayer', () => {
    it('Should increment currentPlayer', () => {
      round.changePlayer()
      expect(round.currentPlayer).to.equal(1);
      round.changePlayer()
      expect(round.currentPlayer).to.equal(2);
      round.changePlayer();
      expect(round.currentPlayer).to.equal(0)
    })
  });

  describe('currentClue', () => {
    expect(round.currentClue().answer).to.equal('The current answer');
  });

  describe('checkGuess', () => {
    it('should increment currentPlayer', () => {
      round.checkGuess(round.currentGuess);
      expect(round.currentPlayer).to.equal(1)
    });

    it('Should add to score if answer is correct', () => {
      round.checkGuess(round.currentGuess)
      expect(round.players[currentPlayer].totalScore).to.equal(100)
    });

    it('Should decrement score if incorrect', () => {
      round.checkGuess(round.currentGuess)
      expect(round.players[currentPlayer].totalScore).to.equal(-100);
    });
  });

  describe('checkClueArray', () => {
    round.checkGuess(round.currentGuess);
    expect(round.checkClueArray().length).to.equal(1);
    round.checkGuess(round.currentGuess);
    expect(round.checkClueArray().length).to.equal(0);
  });

});