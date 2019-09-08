class Round {
  constructor(game, generatedPlayers, clues) {
    this.game = game;
    this.players = generatedPlayers;
    this.clues = clues;
    this.currentPlayer = this.players[0]; //Change to be last rounds player to answer last question correctly
    this.currentGuess;
    this.currentAnswer;
    this.currentClue;
    this.guessCount = 0;
    this.dailyDouble();
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

  setCurrentClue(index) {
    this.currentClue = this.clues[index];
  }
       
  takeGuess(guess) {
    if (guess === this.currentClue.answer.toLowerCase()) {
      this.handleGuess(true);
      this.nextRoundHelper();
      return true;
    } else {
      this.handleGuess(false);
      this.nextRoundHelper();
      return false;
    }
  }

  handleGuess(isGoodGuess) {
    const currentPlayerIndex = this.getPlayerIndex();
    const currentClueIndex = this.getClueIndex();
    if (isGoodGuess) {
      this.currentPlayer.incrementScore(this.currentClue.pointValue);
      this.clues.splice(currentClueIndex, 1);
    } else {
      this.currentPlayer.decrementScore(this.currentClue.pointValue);
      this.players[currentPlayerIndex] = this.currentPlayer;
      this.changePlayer();
    }
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
    return this.clues.filter(clue => clue.dailyDouble === true);
  }

}

export default Round;