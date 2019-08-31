import chai from 'chai';
const expect = chai.expect;

import Player from '../src/Player';

var player

beforeEach(() => {
  player = new Player(['player1', 'player2', 'player3']);
});

describe('Player', () => {

  it('should be a function', () => {
    expect(Player).to.be.a('function');
  });

  it('should be an instance of the player class', () => {
    expect(player).to.be.an.instanceof(Player);
  })

});