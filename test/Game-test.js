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
    game.startGame()
  });

  it('should be a function', () => {
    expect(Game).to.be.a('function');
  });

  it('should instantiate an new instance of Game', () => {
    expect(game).to.be.an.instanceOf(Game);
  });

  it('should be able to have three players', () => {
    expect(game.playersList.length).to.be(3)
  });

  it('should have a round counter to keep track of rounds and should start as zero', () => {
    expect(game.roundCounter).to.equal(0)
  });

  it('should have a winner', () => {
    expect(game.roundCounter).to.equal(1);
    game.generateRound()
    expect(game.roundCounter).to.equal(2);
    game.generateRound()
    expect(game.roundCounter).to.equal(3);
    game.generateRound()
    expect(game.winner).to.equal(3)
  });

  it('should hold the clues for the current round', () => {
    expect(game.clues).to.eql([]);
  });

  it('should hold the categories for the current round', () => {
    expect(game.categories).to.eql([]);
  });

  describe('generateRound', () => {
    it('should instantiate the next round depending on the round counter', () => {
      expect(game.roundCounter).to.equal(1);
      game.generateRound()
      expect(game.roundCounter).to.equal(2);
      // game.generateRound()
      console.log('blah', game.clues)
      // expect(game.roundCounter).to.equal(3);
    });
  });

  describe('generatePlayers', () => {
    it('should instantiate each player', () => {
      game.generatePlayers();
      expect(this.generatedPlayers).to.eql([{'Kayla': 'awesome'}])
    });
  });

  describe('startGame', () => {
    it('should call the functions needed to start a game', () => {
      //maybe chai spies to see if other functions fired

    });
  });

  describe('generateCategories', () => {
    it('should pick four unique categories for each round', () => {
      expect(game.currentCategories.length).to.equal(4);
    });
  });

  describe('generateClues', () => {
    it('should generate clues based on category and round', () => {
      game.generateCategories();
      game.generateClues();
      game.generateRound();
      // game.generateClues();
      expect(game.clues).to.eql([]);
    });
  });


  



});