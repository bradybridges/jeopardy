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
      let guess = $('.user-input').val().toLowerCase();
      let result = game.currentRound.takeGuess(guess);
      console.log("RESULT", result)
      if (result === true) {
        this.correctGuess();
        console.log("correct")
      } else {
        this.wrongGuess();
        console.log("incorrect")
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
    $('.clue-info').fadeOut(10000);
  },

  wrongGuess() {
    $(document.body).append(`<div class="clue-info">
    <p class="correct-gif-text">Wrong!</p>
    <img src="../images/wrong-guess.gif" class="moving-grid">
    <img src="../images/splash.gif" class="moving-grid">
    </div> `);
    $('.clue-info').fadeOut(10000);
  }


 
};

export default domUpdates;
