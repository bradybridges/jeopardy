import $ from 'jquery';

const domUpdates = {

  transitionToFirstRound() {
    $('.splash-container').fadeOut(2000);
    $('.round-one').fadeIn(6000).prop('hidden', false)
  },

  populateBoard(categories, clues) {

    for (let i = 0; i < 4; i++) {
      let gridItemToTarget = `.grid-item:nth-child(${i + 1})`;
      $(gridItemToTarget).text(categories[i].name);
    }

    for (let i = 0; i < 16; i++) {
      let gridItemToTarget = `.grid-item:nth-child(${i + 5})`;
      $(gridItemToTarget).attr('data-index', i)
      $(gridItemToTarget).text(clues[i].pointValue);
    }
  },

  populateClueInteraction(question, game) {
    $('.user-input').empty();
    console.log("inDOM", $('.user-input').val())
    $(document.body).append(`<div class="clue-info">
    <p class="clue-question">${question}</p>
    <input class="user-input" type="text" placeholder="Enter Guess">
    <button class="user-guess-btn">Submit Guess</button>
  </div>`);
    this.checkGuessHelper(game)
  },

  checkGuessHelper(game) {
    $('.user-guess-btn').click( (e) => {
      e.preventDefault()
      console.log("doomdidoomdidoooom")
      console.log("Person After True", game.currentRound.currentPlayer.id)
      console.log("Score Before", game.currentRound.currentPlayer.score)
      let guess = $('.user-input').val().toLowerCase();
      console.log("Guess", guess)
      // console.log("Answer", game.currentRound.currentAnswer)
      let result = game.currentRound.takeGuess(guess);
      console.log("RESULT", result)
      if (result === true) {
        this.correctGuess();
        console.log("correct")
        console.log("Person After Correct Guess", game.currentRound.currentPlayer.id)
        console.log("Score After True", game.currentRound.currentPlayer.score)
        // console.log("Score After True", game.currentRound.currentPlayer.score)
      } else {
        this.wrongGuess();
        console.log("incorrect")
        console.log("Person After False", game.currentRound.currentPlayer);
        console.log("Score After False", game.currentRound.currentPlayer.score);
      }
    })
  },

  correctGuess() {
    $(document.body).append(`
    <div class="clue-info">
    <p class="correct-gif-text">Correct!</p>
    <img src="../images/correct-guess.gif" class="correct-guess">
    <img src="../images/splash.gif" class="moving-grid">
    </div>`);
    $('.clue-info').fadeOut(3000);
  },

  wrongGuess() {
    $(document.body).append(`<div class="clue-info">
    <p class="correct-gif-text">Wrong!</p>
    <img src="../images/splash.gif" class="moving-grid">
    <img src="../images/host.gif">
    </div> `);
    $('.clue-info').fadeOut(3000);
  }


 
};

export default domUpdates;
