import Round from '../src/Round';

class Round3 extends Round {
  constructor(game, generatedPlayers, clues, category) {
    super(game, generatedPlayers, clues);
    this.category = category;
    this.currentClue = this.clues;
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

  isGoodWager(wager, playerIndex) {
    console.log("PLayers:", this.players)
    let playerScore = this.players[playerIndex].score
    let boardHigh = this.currentClue.pointValue;
    let min = 5;
    let max = playerScore > boardHigh ? playerScore : boardHigh; 
    if (wager >= min && wager <= max) {
      return true;
    } else {
      return false;
    }
  }
}

export default Round3;