class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.totalScore = 0;
    this.wager;
  }

  updateScore(pointValue) {

  }

  checkWager(wager) {
    this.wager = wager;
    this.totalScore = this.totalScore + parseInt(this.wager);
  }
}



export default Player;