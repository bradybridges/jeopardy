class Round {
  constructor(generatedPlayers, clues, ) {
    this.players = generatedPlayers;
    this.clues = clues;
    this.currentPlayer;
    this.currentGuess;
    this.currentAnswer;
    this.currentClue;
  }

  currentClue(id, pointValue, question) {
    this.currentClue = this.clues.find(clue => {
      if(clue.id === id && clue.pointValue === pointValue && clue.question === question) {
        return true;
      } else {
        return false;
      }
    });
  }

  takeGuess(guess) {
    if(guess === this.currentClue.answer) {
      handleGuess(guess, true);
    } else {
      handleGuess(guess, false);
    }
  }

  handleGuess(guess, isGoodGuess) {
    const currentPlayerIndex = this.getPlayerIndex();
    
    if(isGoodGuess) {
      this.currentPlayer.score += this.currentClue.pointValue;
    } else {
      this.currentPlayer.score -= this.currentClue.pointValue;
      this.players[currentPlayerIndex] = this.currentPlayer;
      this.changePlayer();
    }
    
  }

  changePlayer() {
    let playerIndex = this.getPlayerIndex();
    playerIndex <= 1 ? this.currentPlayer = players[playerIndex + 1] : this.currentPlayer = players[0];
  }

  getPlayerIndex() {
    return this.players.findIndex(player => player.id === currentPlayer.id);
  }

  isClueArrayEmpty() {
    return this.clues.length === 0 ? true : false;
  }

}

export default Round;