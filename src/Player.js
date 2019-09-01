class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.score = 0;
    this.wager;
  }

  updateScore(pointValue) {

  }

  checkWager(wager) {
    this.wager = wager;
    this.score = this.score + parseInt(this.wager);
  }
}



export default Player;