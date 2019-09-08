class Round3 extends Round {
  constructor(category, clue, player) {
    this.category = category;
    this.currentClue = clue;
    this.currentPlayer = this.players[0];
    this.guessCount = 0;
  }

  takeGuess(guess, wager) {
    if (guess === this.currentClue.answer.toLowerCase()) {
      this.handleGuess(true, wager);
      return true;
    } else {
      this.handleGuess(false, wager);
      return false;
    }
  }

  handleGuess(isGoodGuess, wager) {
    const currentClueIndex = this.getClueIndex();
    if (isGoodGuess) {
      this.currentPlayer.incrementScore(wager);
    } else {
      this.currentPlayer.decrementScore(wager);
    }
    this.changePlayer();
  }

  findWinner() {
    this.players.sort((a,b) => a.score - b.score);
    return this.players[2];
  }


}