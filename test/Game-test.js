import chai from 'chai';
import spies from 'chai-spies';
import Game from '../src/Game';
import data from '../src/data';
import Round from '../src/Round';
import Player from '../src/Player';

const expect = chai.expect;
chai.use(spies);

let game = new Game(data, ['Kayla', 'Brady', 'Allison']);

describe('Game', () => {
  
  // beforeEach(() => {
  //   game = new Game(data, ['Kayla','Brady','Allison']);
  // });

  it('should be a function', () => {
    expect(Game).to.be.a('function');
  });

  it('should instantiate an new instance of Game', () => {
    expect(game).to.be.an.instanceOf(Game);
  });

  it('should be able to have three players', () => {
    expect(game.playersList).to.deep.equal(['Kayla', 'Brady', 'Allison']);
  });

  it('should have a round counter to keep track of rounds and should start at one', () => {
    expect(game.roundCounter).to.equal(1);
  });

  it.skip('should hold the clues for the current round', () => {
    expect(game.clues).to.eql([]);
    //need to fix such that round1 - round2 clues.length === 16 and round3 clues.length === 1
  });

  it('should hold the categories for the current round', () => {
    expect(game.currentCategories.length).to.eql(4);
  });

  describe('startGame', () => {
    it('should call the functions needed to start a game', () => {
      expect(game.generatedPlayers.length).to.equal(3);
      expect(game.currentCategories.length).to.equal(4);
      expect(game.clues.length).to.not.equal(0); // change to be eql to 16 or 1(for round3)
      expect(game.roundCounter).to.equal(1);
      expect(game.currentRound).to.be.an.instanceof(Round);

    });
  });

  describe('nextRoundHandler', () => {
    it('round counter should increment with each new round', () => {
    expect(game.roundCounter).to.equal(1);
    game.nextRoundHandler();
    expect(game.roundCounter).to.equal(2);
    game.nextRoundHandler();
    expect(game.roundCounter).to.equal(3);
    });
  });


  describe('generatePlayers', () => {
    it('should instantiate each player', () => {
      game.generatePlayers();
      expect(game.generatedPlayers.length).to.eql(3);
    });
  });

  describe('generateCategories', () => {
    it('should pick four unique categories for each round', () => {
      expect(game.currentCategories.length).to.equal(4);
    });
  });

  describe('generateClues', () => {
    it.skip('should generate clues based on category and round', () => {
      expect(game.clues).to.eql('hi');
    });
    //need to fix such that round1 - round2 clues.length === 16 and round3 clues.length === 1
  });


  



});