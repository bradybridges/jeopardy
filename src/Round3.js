import Round from '../src/Round';

class Round3 extends Round {
  constructor(game, generatedPlayers, clues, category) {
    super(game, generatedPlayers, clues);
    this.category = category;
    this.currentClue = this.clues;
    this.wagers;
  }

  takeGuess(guess, wager) {
    if (guess === this.currentClue.answer.toLowerCase().replace(/[^a-zA-Z0-9\s]/g ,'')) {
      this.handleGuess(true, wager);
      return true;
    } else {
      this.handleGuess(false, wager);
      return false;
    }
  }

  handleGuess(isGoodGuess, wager) {
    if (isGoodGuess) {
      this.currentPlayer.incrementScore(wager);
    } else {
      this.currentPlayer.decrementScore(wager);
    }
    this.changePlayer();
  }

  findWinner() {
    this.players.sort((a, b) => a.score - b.score);
    return this.players[2];
  }

  isGoodWager(wager, playerIndex) {
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

  setWagers(wagerArray) {
    this.wagers = wagerArray;
  }

  checkGuesses(guessArray) {
    let index = 0;
    guessArray.forEach(guess => {
      if (guess === this.currentClue.answer) {
        this.players[index].incrementScore(this.wagers[index]);
        index++;
      } else {
        this.players[index].decrementScore(this.wagers[index]);
        index++;
      }
    })
  }
}

export default Round3;