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
      $(gridItemToTarget).attr('data-answer', clues[i].answer)
      $(gridItemToTarget).text(clues[i].pointValue);
    }
  },

  populateClueInteraction(question, game) {
    $('.clue-info').remove();
    console.log("inDOM BEFORE APPEND CARD", $('.user-input').val())
    $('.pop-up-clue').append(`<div class="clue-info">
    <p class="clue-question">${question}</p>
    <input class="user-input" type="text" placeholder="Enter Guess">
    <button class="user-guess-btn">Submit Guess</button>
  </div>`);
  $('.pop-up-clue').removeAttr('hidden')
  console.log("inDOM AFTER APPEND CARD", $('.user-input').val())
    this.checkGuessHelper(game)
  },

  checkGuessHelper(game) {
    $('.user-guess-btn').click( (e) => {
      e.preventDefault()

  
      console.log("current Player:", game.currentRound.currentPlayer.id)
      // console.log("Score Before:", game.currentRound.currentPlayer.score)

      let guess = $('.user-input').val().toLowerCase();

      console.log("Guess:", guess)

      let playerGuessing = game.currentRound.currentPlayer;
      let result = game.currentRound.takeGuess(guess);
      this.updateScore(playerGuessing);
      console.log("player guessing:", playerGuessing)
      if (result === true) {
        this.correctGuess();

        console.log("correct")

      } else {
        this.wrongGuess();
        console.log("incorrect");
        

        console.log("Person After False", game.currentRound.currentPlayer);
        console.log("Score After False", game.currentRound.currentPlayer.score);
      }
    })
  },

  correctGuess() {
    $(document.body).append(`
    <div class="clue-info">
    <p class="correct-gif-text">Correct!</p>
    // <img src="../images/correct-guess.gif" class="correct-guess">
    <img src="../images/splash.gif" class="moving-grid">
    </div>`);
    $('.clue-info').fadeOut(3000);
  },

  wrongGuess() {
    $(document.body).append(`<div class="clue-info">
    <p class="correct-gif-text">Wrong!</p>
    <img src="../images/splash.gif" class="moving-grid">
    // <img src="../images/host.gif">
    </div> `);
    $('.clue-info').fadeOut(3000);
  },

  appendPlayers(game) {
    this.playerOneAppend(game.generatedPlayers[0]);
    this.playerTwoAppend(game.generatedPlayers[1]);
    this.playerThreeAppend(game.generatedPlayers[2]);

    //forEach and append dynamically?
  },

  playerOneAppend(player1) {
    console.log("PLAYA1", player1)
    $('.PP1-name').text(player1.name);
    $('.PP1-score').text(player1.score);
  },

  playerTwoAppend(player1) {
    console.log("PLAYA2", player1)
    $('.PP2-name').text(player1.name);
    $('.PP2-score').text(player1.score);
  },

  playerThreeAppend(player1) {
    console.log("PLAYA3", player1)
    $('.PP3-name').text(player1.name);
    $('.PP3-score').text(player1.score);
  },

  updateScore(ofWhose) {
    $(`.PP${ofWhose.id}-score`).text('');
    $(`.PP${ofWhose.id}-score`).text(ofWhose.score);
  }

};

export default domUpdates;
