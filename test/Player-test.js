import chai from 'chai';
const expect = chai.expect;
import Player from '../src/Player';

var player;

beforeEach(() => {
  player = new Player(1, 'Allison');
});

describe('Player', () => {

  it('should be a function', () => {
    expect(Player).to.be.a('function');
  });

  it('should be an instance of the player class', () => {
    expect(player).to.be.an.instanceof(Player);
  });

  it('should have an id', () => {
    expect(player.id).to.equal(1);
  })

  it('should have a name and a score that starts at 0', () => {
    expect(player.name).to.equal('Allison');
    expect(player.score).to.equal(0);
  });

  describe('incrementScore', () => {
    it('Should increment score', () => {
      player.incrementScore(100);
      expect(player.score).to.equal(100);
    })
  });

  describe('decrementScore', () => {
    it('Should decrement score', () => {
      player.decrementScore(100);
      expect(player.score).to.equal(-100);
    })
  })

});