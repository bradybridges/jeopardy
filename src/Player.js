class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.score = 0;
  }

  decrementScore(pointValue) {
    this.score -= pointValue;
  }

  incrementScore(pointValue) {
    this.score += pointValue;
  }

}



export default Player;