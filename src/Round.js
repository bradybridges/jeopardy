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
    if(this.game.roundCounter === 1) {
      this.generateDailyDoubles(1);
    } else if(this.game.roundCounter === 2) {
      this.generateDailyDoubles(2);
    }
  }

  generateDailyDoubles(numToCreate) {
    if(numToCreate === 1) {
      let dailyDoubleIndex = this.returnDailyDoubleIndex();
      this.clues[dailyDoubleIndex].dailyDouble = true;
    } else {
      let firstDailyDoubleIndex = this.returnDailyDoubleIndex();
      let secondDailyDoubleIndex = this.returnDailyDoubleIndex();
      while(firstDailyDoubleIndex === secondDailyDoubleIndex) {
        secondDailyDoubleIndex = this.returnDailyDoubleIndex();
      }
      this.clues[firstDailyDoubleIndex].dailyDouble = true;
      this.clues[secondDailyDoubleIndex].dailyDouble = true;
    }
  }

  returnDailyDoubleIndex() {
    return Math.floor(Math.random() * 15);
  }

  setCurrentClue(id, pointValue, question) {
    this.currentClue = this.clues.find(clue => {
      if (clue.categoryId === id && clue.pointValue === pointValue && clue.question === question) {
        return true;
      } else {
        return false;
      }
    });
  }
       
  takeGuess(guess) {
    if (guess === this.currentClue.answer) {
      this.handleGuess(guess, true);
      this.nextClueHandler(true)
    } else {
      this.handleGuess(guess, false);
      this.nextClueHandler(false);
    }
  }

  handleGuess(guess, isGoodGuess) {
    const currentPlayerIndex = this.getPlayerIndex();
    const currentClueIndex = this.getClueIndex();
    if (isGoodGuess) {
      this.currentPlayer.score += this.currentClue.pointValue;
      this.clues.splice(currentClueIndex, 1);
    } else {
      this.guessCount++;
      this.currentPlayer.score -= this.currentClue.pointValue;
      this.players[currentPlayerIndex] = this.currentPlayer;
      this.changePlayer();
    }
  }

  nextClueHandler(isGoodGuess) {
    if (this.guessCount === 3 || isGoodGuess) {
      //later call fn to prompt user to select next clue, take out code below
      const currentClueIndex = this.getClueIndex();
      this.currentClue = this.clues[currentClueIndex + 1];
      this.guessCount = 0;
    }
    if(this.isClueArrayEmpty()) {
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