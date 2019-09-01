import chai from 'chai';
import spies from 'chai-spies';
import Game from '../src/Game';
import data from '../src/data';
import Round from '../src/Round';
import Player from '../src/Player';

const expect = chai.expect;
chai.use(spies);

let game;

describe('Game', () => {
  
  beforeEach(() => {
    game = new Game(data, ['Kayla','Brady','Allison']);
  });

  it('should be a function', () => {
    expect(Game).to.be.a('function');
  });

  it('should instantiate an new instance of Game', () => {
    expect(game).to.be.an.instanceOf(Game);
  });

  it('should be able to have three players', () => {
      expect(game.players.length).to.be(3)
  });

  it('should have a round counter to keep track of rounds and should start as zero', () => {
      expect(game.roundCounter).to.equal(0)
  });

  it('should have a winner', () => {
    game.generateRound()
    expect(game.roundCounter).to.be(1);
    game.generateRound()
    expect(game.roundCounter).to.be(2);
    game.generateRound()
    expect(game.roundCounter).to.be(3);
    game.generateRound()
      expect(game.winner).to.equal(#)
  });

  it('should hold the clues for the current round', () => {
      expect(game.clues).to.eql([]);
  });

  it('should hold the categories for the current round', () => {
    expect(game.categories).to.eql([]);
    });

  describe('generateRound', () => {
    it('should instantiate the next round depending on the round counter', () => {
        game.generateRound()
        expect(game.roundCounter).to.be(1);
        game.generateRound()
        expect(game.roundCounter).to.be(2);
        game.generateRound()
        expect(game.roundCounter).to.be(3);
    });
  });

  describe('generatePlayers', () => {
      it('should instantiate each player', () => {
          game.generatePlayers();
          expect(game.players[0]).to.be({*})
      });
  });

  describe('startGame', () => {
      it('should call the functions needed to start a game', () => {
          game.startGame();
        //maybe chai spies to see if other functions fired

      })
  })
  



});