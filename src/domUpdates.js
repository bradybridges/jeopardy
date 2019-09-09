import $ from 'jquery';

const domUpdates = {

  transitionToFirstRound() {
    $('.splash-container').fadeOut(2000);
    $('.round-one').fadeIn(6000);
  },

  populateBoard(categories, clues) {

    for (let i = 0; i < 4; i++) {
      let gridItemToTarget = `.grid-item:nth-child(${i + 1})`;
      $(gridItemToTarget).text(categories[i].name);
    }

    for (let i = 0; i < 16; i++) {
      let gridItemToTarget = `.grid-item:nth-child(${i + 5})`;
      // $(gridItemToTarget).attr('data-index', i)
      $(gridItemToTarget).attr('data-answer', clues[i].answer)
      $(gridItemToTarget).text(clues[i].pointValue);
    }
  },

  populateClueHelper(question, game) {
    game.currentRound.currentClue.dailyDouble ? this.populateDailyDouble(question, game) : this.populateClueInteraction(question, game);
  },

  populateClueInteraction(question, game) {
    $('.clue-info').remove();
    $('.pop-up-clue').append(`<div class="clue-info">
    <p class="clue-question">${question}</p>
    <input class="user-input" type="text" placeholder="Enter Guess">
    <button class="user-guess-btn">Submit Guess</button>
  </div>`);
    $('.pop-up-clue').removeAttr('hidden')
    this.checkGuessHelper(game);
  },

  populateDailyDouble(question, game) {
    $('.clue-info').remove();
    $('.pop-up-clue').append(`<div class="clue-info">
    <p class="clue-question">${question}</p>
    <input class="wager-input" type="text" placeholder="Type in Wager">
    <button class="wager-btn">Check Wager</button>
    <input class="user-input" type="text" placeholder="What is: Your Guess?">
    <button class="user-guess-daily-double-btn" disabled>Submit Guess</button>
  </div>`);
    $('.pop-up-clue').removeAttr('hidden');
    this.checkDailyDoubleWagerHelper(game)
    this.checkDailyDoubleGuessHelper(game);
  },

  checkGuessHelper(game) {
    $('.user-guess-btn').click( (e) => {
      e.preventDefault()
      let guess = $('.user-input').val().toLowerCase();
      let playerGuessing = game.currentRound.currentPlayer;
      let result = game.currentRound.takeGuess(guess);
      if (result === true) {
        this.correctGuess();
      } else {
        this.wrongGuess();
      }
      this.updateScore(playerGuessing, game);
    })
  },
  checkDailyDoubleWagerHelper(game) {
    $('.wager-btn').click( (e) => {
      e.preventDefault()
      let wager = parseInt($('.wager-input').val());
      if (game.currentRound.isGoodWager(wager)) {
        this.correctWager();
        $('.user-guess-daily-double-btn').prop("disabled", false);
      } else {
        this.incorrectWager();
        $('.wager-input').val('');
      }
    })
  },

  checkDailyDoubleGuessHelper(game) {
    $('.user-guess-daily-double-btn').click( (e) => {
      e.preventDefault()
      let guess = $('.user-input').val().toLowerCase();
      let wager = parseInt($('.wager-input').val());
      let playerGuessing = game.currentRound.currentPlayer;
      let result = game.currentRound.takeDailyDoubleGuess(guess, wager);

      if (result === true) {
        this.correctGuess();
      } else {
        this.wrongGuess();
      }
      this.updateScore(playerGuessing, game);
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
    $('.PP1-name').text(player1.name);
    $('.PP1-score').text(player1.score);
  },

  playerTwoAppend(player1) {
    $('.PP2-name').text(player1.name);
    $('.PP2-score').text(player1.score);
  },

  playerThreeAppend(player1) {
    $('.PP3-name').text(player1.name);
    $('.PP3-score').text(player1.score);
  },

  updateScore(ofWhose, game) {
    $(`.PP${ofWhose.id}-score`).text('');
    $(`.PP${ofWhose.id}-score`).text(ofWhose.score);
    this.isRoundOver(game);
  },

  correctWager() {
    alert("Wager Accepted. Guess on.")
  },

  incorrectWager() {
    alert("Wager Denied. Wage on.")
  },

  isRoundOver(game) {
    if (game.currentRound.isClueArrayEmpty()) {
      game.currentRound.nextRoundHelper();
      this.handleNextRoundGameBoard(game);
    }
  },

  handleNextRoundGameBoard(game) {
    if(game.roundCounter === 2) {
      $('.round-one').remove();
      $('.round-two').fadeIn(6000);
      this.populateBoard(game.currentCategories, game.clues);
    } else {
      $('.round-two').remove();
      console.log('Set Round3 Board');
    }
  },



};

export default domUpdates;
