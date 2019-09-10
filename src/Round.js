class Round {
  constructor(game, generatedPlayers, clues) {
    this.game = game;
    this.players = generatedPlayers;
    this.clues = clues;
    this.currentPlayer = this.players[0];
    this.currentGuess;
    this.currentClue;
    this.dailyDouble();
    console.log("daily double", this.findDailyDoubles())
  }

  dailyDouble() {
    if (this.game.roundCounter === 1) {
      this.generateDailyDoubles(1);
    } else if (this.game.roundCounter === 2) {
      this.generateDailyDoubles(2);
    }
  }

  generateDailyDoubles(numToCreate) {
    if (numToCreate === 1) {
      let dailyDoubleIndex = this.returnDailyDoubleIndex();
      this.clues[dailyDoubleIndex].dailyDouble = true;
    } else {
      let firstDailyDoubleIndex = this.returnDailyDoubleIndex();
      let secondDailyDoubleIndex = this.returnDailyDoubleIndex();
      while (firstDailyDoubleIndex === secondDailyDoubleIndex) {
        secondDailyDoubleIndex = this.returnDailyDoubleIndex();
      }
      this.clues[firstDailyDoubleIndex].dailyDouble = true;
      this.clues[secondDailyDoubleIndex].dailyDouble = true;
    }
  }

  returnDailyDoubleIndex() {
    return Math.floor(Math.random() * 15);
  }

  setCurrentClue(answer) {
    this.currentClue = this.clues.find(clue => clue.answer === answer);
  }
       
  takeGuess(guess) {
    if (guess === this.currentClue.answer.toLowerCase()) {
      this.handleGuess(true);
      return true;
    } else {
      this.handleGuess(false);
      return false;
    }
  }

  takeDailyDoubleGuess(guess, wager) {
    if (guess === this.currentClue.answer.toLowerCase()) {
      this.handleDailyDoubleGuess(true, wager);
      return true;
    } else {
      this.handleDailyDoubleGuess(false, wager);
      return false;
    }
  }

  handleGuess(isGoodGuess) {
    const currentClueIndex = this.getClueIndex();
    if (isGoodGuess) {
      this.currentPlayer.incrementScore(this.currentClue.pointValue);
    } else {
      this.currentPlayer.decrementScore(this.currentClue.pointValue);
    }
    this.changePlayer();
    this.clues.splice(currentClueIndex, 1);
  }

  handleDailyDoubleGuess(isGoodGuess, wager) {
    const currentClueIndex = this.getClueIndex();
    if (isGoodGuess) {
      this.currentPlayer.incrementScore(wager);
    } else {
      this.currentPlayer.decrementScore(wager);
    }
    this.changePlayer();
    this.clues.splice(currentClueIndex, 1);
  }

  nextRoundHelper() {
    if (this.isClueArrayEmpty()) {
      this.game.nextRoundHandler();
    }
  }

  changePlayer() {
    let playerIndex = this.getPlayerIndex();
    playerIndex <= 1 ? this.currentPlayer = this.players[playerIndex + 1] : this.currentPlayer = this.players[0];
  }

  getPlayerIndex() {
    return this.players.findIndex(player => player.id === this.currentPlayer.id);
  }

  getClueIndex() {
    return this.clues.findIndex(clue => clue.question === this.currentClue.question);
  }

  isClueArrayEmpty() {
    return this.clues.length === 0 ? true : false;
  }

  findDailyDoubles() {
    if (this.game.roundCounter <= 2) {
      return this.clues.filter(clue => clue.dailyDouble === true);
    }
  }

  isGoodWager(wager) {
    let playerScore = this.currentPlayer.score;
    let boardHigh = this.clues[this.clues.length - 1].pointValue;
    let min = 5;
    let max = playerScore > boardHigh ? playerScore : boardHigh; 
    if (wager >= min && wager <= max) {
      return true;
    } else {
      return false;
    }
  }

}

export default Round;