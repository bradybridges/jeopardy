import $ from 'jquery';

const domUpdates = {

  transitionToFirstRound() {
    $('.splash-container').fadeOut(2000);
    $('.round-one').fadeIn(6000).prop('hidden', false);
    $('.player-container').fadeIn(6000).removeAttr('style')

  },

  populateBoard(categories, clues) {

    for (let i = 0; i < 4; i++) {
      let gridItemToTarget = `.grid-item:nth-child(${i + 1})`;
      $(gridItemToTarget).text(categories[i].name);
    }

    for (let i = 0; i < 16; i++) {
      let gridItemToTarget = `.grid-item:nth-child(${i + 5})`;
      $(gridItemToTarget).attr('data-answer', clues[i].answer)
      $(gridItemToTarget).text(clues[i].pointValue);
    }
  },

  populateClueHelper(question, game) {
    game.currentRound.currentClue.dailyDouble ? this.populateDailyDouble(question, game) : this.populateClueInteraction(question, game);
  },

  populateClueInteraction(question, game) {
    $('.clue-info').remove();
    $('.pop-up-clue').append(`<div class="clue-info clue-pop">
    <p class="clue-question">${question}</p>
    <input class="user-input" type="text" placeholder="${this.findCurrentPlayerName(game)} Enter Guess">
    <button class="user-guess-btn">Submit Guess</button>
  </div>`);
    $('.pop-up-clue').removeAttr('hidden')
    this.checkGuessHelper(game);
  },

  populateDailyDouble(question, game) {
    $('.clue-info').remove();
    $('.pop-up-clue').append(`<div class="clue-info daily-double">
    <h3> Daily Double </h3>
    <p class="clue-question">${question}</p>
    <input class="wager-input" type="text" placeholder="${this.findCurrentPlayerName(game)} Enter Wager">
    <button class="wager-btn">Check Wager</button>
    <input class="user-input" type="text" placeholder=" ${this.findCurrentPlayerName(game)} Enter Guess">
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
      this.displayCurrentPlayerName(game);
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
      this.displayCurrentPlayerName(game);
    })
  },

  correctGuess() {
    $('.clue-info').remove();
    $(document.body).append(`
    <div class="clue-info">
    <p class="correct-gif-text">Correct!</p>
    <img src="../images/correct-guess.gif" class="correct-guess">
    </div>`);
    $('.clue-info').fadeOut(3000);
  },

  wrongGuess() {
    $('.clue-info').remove();
    $(document.body).append(`<div class="clue-info">
    <p class="correct-gif-text">Wrong!</p>
    <img src="../images/wrong-guess.gif" class="moving-grid">
    </div> `);
    $('.clue-info').fadeOut(3000);
  },

  appendPlayers(game) {
    this.playerOneAppend(game.generatedPlayers[0]);
    this.playerTwoAppend(game.generatedPlayers[1]);
    this.playerThreeAppend(game.generatedPlayers[2]);
    this.displayCurrentPlayerName(game);

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
    if (game.roundCounter === 2) {
      $('.round-one').remove();
      $('.round-two').fadeIn(400);
      this.populateBoard(game.currentCategories, game.clues);
    } else {
      $('.round-one').remove();
      $('.round-two').remove();
      $('.round-three').fadeIn(400);
      this.populateRoundThreeCategory(game.currentRound.category.name, game)
    }
  },

  populateRoundThreeCategory(question, game) {
    $('.round-three').append(`<div class="category-third-round">
    <p class="round-3-style"> Category:</p>
    <p class="clue-question round-3-style">${question}</p>
    <p class="round-3-style"> Please Enter Your Wagers</p>
    <div class="p1-wager round-3-style">
      <p class="p1-wager-feedback"></p>
      <input class="p1-wager-input" placeholder="${game.currentRound.players[0].name} Enter Wager">
    </div>
    <div class="p2-wager round-3-style">
        <p class="p2-wager-feedback"></p>
        <input class="p2-wager-input" placeholder="${game.currentRound.players[1].name} Enter Wager">
      </div>
      <div class="p3-wager round-3-style">
          <p class="p3-wager-feedback"></p>
          <input class="p3-wager-input" placeholder="${game.currentRound.players[2].name} Enter Wager">
        </div>
    <button class="submit-wagers round-3-style" disabled>Submit All Wagers</button>
  </div>`);
    this.player1WageCheck(game);
    this.player2WageCheck(game);
    this.player3WageCheck(game);
    this.submitWagersHandler(game);
  },

  player1WageCheck(game) {
    $('.p1-wager-input').keyup( (e) => {
      e.preventDefault()

      if (e.currentTarget.classList.contains('p1-wager-input')) {
        let wager = parseInt($('.p1-wager-input').val());
        this.wagerCheck(wager, 0, game);
      }
    })
  },

  player2WageCheck(game) {
    $('.p2-wager-input').keyup( (e) => {
      e.preventDefault()

      if (e.currentTarget.classList.contains('p2-wager-input')) {
        let wager = parseInt($('.p2-wager-input').val());
        this.wagerCheck(wager, 1, game);
      }
    })
  },

  player3WageCheck(game) {
    $('.p3-wager-input').keyup( (e) => {
      e.preventDefault()

      if (e.currentTarget.classList.contains('p3-wager-input')) {
        let wager = parseInt($('.p3-wager-input').val());
        this.wagerCheck(wager, 2, game);
      }
    })
  },

  wagerCheck(wager, playerIndex, game) {
    const name = game.generatedPlayers[playerIndex].name;
    if (game.currentRound.isGoodWager(wager, playerIndex) === true) {
      const pToSelect = `.p${playerIndex + 1}-wager-feedback`;
      $(pToSelect).text(`${name} Valid Wager`);
      $('.user-guess-daily-double-btn').prop("disabled", false);
    } else {
      const pToSelect = `.p${playerIndex + 1}-wager-feedback`;
      $(pToSelect).text('');
      $(pToSelect).text( `${name} Invalid Wager`);
    }
    this.checkAllWagers();
  },

  checkAllWagers() {
    let playerOneFeedback = $('.p1-wager-feedback').text();
    let playerTwoFeedback = $('.p2-wager-feedback').text();
    let playerThreeFeedback = $('.p3-wager-feedback').text();
    let playersFeedback = [playerOneFeedback, playerTwoFeedback, playerThreeFeedback];
  

    if (playersFeedback.filter(feedback => feedback.includes('Valid Wager')).length === 3) {
      $('.submit-wagers').prop('disabled', false);
    } else {
      $('.submit-wagers').prop('disabled', true);
    }
  },

  submitWagersHandler(game) {
    $('.submit-wagers').click(() => {
      const player1Wager = parseInt($('.p1-wager-input').val());
      const player2Wager = parseInt($('.p2-wager-input').val());
      const player3Wager = parseInt($('.p3-wager-input').val());

      game.currentRound.setWagers([player1Wager, player2Wager, player3Wager]);
      $('.category-third-round').remove();
      this.playerGuessesHandler(game);
    });
  },

  playerGuessesHandler(game) {
    let guessCount = 0;
    let guesses = [];
    this.appendGuessContainer( 0, game);
    this.guessContainerHandler(guessCount, guesses, game);
  },

  appendGuessContainer(playerIndex, game) {
    const name = game.generatedPlayers[playerIndex].name;
    const question = game.currentRound.currentClue.question;
    $('.round-three').append(`
      <div class='player-guess-container'>
        <p class='player-name last-page-name'>${name}'s Turn</p>
        <p class='final-question last-page-question'>${question}</p>
        <input class='player-guess-input last-page-input' type='text' placeholder='${this.findCurrentPlayerName(game)} Guess'>
        <button class='player-guess-button'>
          Submit Guess
        </button>
      </div>
      `);
  },

  guessContainerHandler(guessCount, guesses, game) {
  
    $('.player-guess-button').click(() => {
      const guess = $('.player-guess-input').val();
      guessCount++;

      if  (guessCount <= 2) {
        guesses.push(guess);
        $('.player-name').text(`${game.generatedPlayers[guessCount].name}'s Turn`);
        $('.player-guess-input').val('');
        $('.player-guess-input').attr("placeholder", `${game.generatedPlayers[guessCount].name} Enter Guess`);
      } else {
        guesses.push(guess);
        $('.player-guess-container').remove();
        game.currentRound.checkGuesses(guesses);
        this.updateAllScores(game);
        this.displayWinner(game);
      }
      

    });
  },

  updateAllScores(game) {
    $('.PP1-score').text(game.currentRound.players[0].score);
    $('.PP2-score').text(game.currentRound.players[1].score);
    $('.PP3-score').text(game.currentRound.players[2].score);
  },

  displayWinner(game) {
    
    const winnerName = game.currentRound.findWinner().name;
    $('.round-three').append(`
      <p class='winner'>${winnerName.toUpperCase()} Wins!</p>
    `);
  },

  findCurrentPlayerName(game) {
    return game.currentRound.currentPlayer.name;
  },

  displayCurrentPlayerName(game) {
    $('.current-player-name').text(`${this.findCurrentPlayerName(game)}'s Turn`)
  }

}

export default domUpdates;
