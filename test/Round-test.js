import chai from 'chai';
import Round from '../src/Round';
import Game from '../src/Game';
import Player from '../src/Player'
import data from '../src/data';
import data2 from './roundMockData';

const expect = chai.expect;

describe('Round', () => {
  let game;
  let round;
  beforeEach( () => {
    game = new Game(data, ['Kayla','Brady','Allison']);
    round = new Round(game.generatedPlayers, data2);
    round.setCurrentClue(10, 100, 'Scorecard Report\" & \"Peter Jacobsen Plugged In\" are seen on the sports channel devoted to this');
  });

  it('Should be a function', () => {
    expect(Round).to.be.a('function');
  });

  it('Players property should hold 3 instances of Player', () => {
    expect(round.players.length).to.equal(3);
    expect(round.players[0]).to.be.an.instanceof(Player);
    expect(round.players[1]).to.be.an.instanceof(Player);
    expect(round.players[2]).to.be.an.instanceof(Player);
  });

  describe('dailyDouble', () => {
    //daily double tests
  });

  describe('changePlayer', () => {
    it('Should increment currentPlayer', () => {
      expect(round.currentPlayer).to.deep.equal({ id: 1, name: 'Kayla', score: 0 });
      round.changePlayer();
      expect(round.currentPlayer).to.deep.equal({ id: 2, name: 'Brady', score: 0 } );
      round.changePlayer();
      expect(round.currentPlayer).to.deep.equal({ id: 3, name: 'Allison', score: 0 });
      round.changePlayer();
      expect(round.currentPlayer).to.deep.equal({ id: 1, name: 'Kayla', score: 0 });
    })
  });

  describe('setCurrentClue', () => {
    it('should be able to set current clue', () => {
      expect(round.currentClue.answer).to.equal('golf');
    })
  });

  describe('takeGuess', () => {
    it('Should decrement score if incorrect', () => {
      round.takeGuess('wrong');
      expect(round.players[0].score).to.equal(-100);
    });

    it('Should increment score if correct', () => {
      round.takeGuess('golf');
      expect(round.players[0].score).to.equal(100);
    });

    it('Should only allow 3 guesses max on a question', () => {
      round.setCurrentClue(10, 200, "One of the most popular shows on the Food Network is \"The Essence of\" him");
      round.takeGuess('wrong');
      round.takeGuess('wrong');
      round.takeGuess('wrong');
      expect(round.currentClue.answer).to.equal('Six Feet Under');
    });

  });

  describe('checkClueArray', () => {
    it('Should be able to determine when clues array is empty', () => {
      round.clues = [data2[0]];
      round.setCurrentClue(10, 200, 'One of the most popular shows on the Food Network is "The Essence of" him');
      expect(round.isClueArrayEmpty()).to.equal(false);
      round.takeGuess('Emeril');
      expect(round.isClueArrayEmpty()).to.equal(true);
    });
  });

});