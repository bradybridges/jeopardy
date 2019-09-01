import chai from 'chai';
const expect = chai.expect;
import Player from '../src/Player';
// import data from '../src/data';



var player

beforeEach(() => {
  player = new Player();
});

describe('Player', () => {

  it('should be a function', () => {
    expect(Player).to.be.a('function');
  });

  it('should be an instance of the player class', () => {
    expect(player).to.be.an.instanceof(Player);
  });

  it.skip('should have an id', () => {
    expect(player.id).to.equal();
  })

  it.skip('should have a name and a score that starts at 0', () => {
    expect(player.name).to.equal(player.name);
    expect(player.totalScore).to.equal(0);
  });

  describe('updateScore', () => { 

    it.skip('should increment the score of a correct answer', () => {
      expect().to.equal();
    });
  
    it.skip('should decrement the tot of a wrong answer', () => {
      expect().to.equal();
    });

    it.skip('should add double the point value in round 2', () => {
      expect().to.equal();
    });

    it.skip('should subtract double the point value in round 2', () => {
      expect().to.equal();
    });
  });
    
  it('should accept a player wager for the daily double', () => {
    player.checkWager(100);
    expect(player.wager).to.equal(100)
  });

  it('should accept a player wager', () => {
    player.checkWager(100)  
    expect(player.wager).to.equal(100)
  });

});