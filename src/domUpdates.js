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
    this.popupEvent(game)
  },

  popupEvent(game) {
    $('.user-guess-btn').click( (e) => {
      e.preventDefault();
      let guess = $('.user-input').val().toLowerCase();
      game.currentRound.takeGuess(guess);
      this.updatePlayerScore(game);

    })
  },

  populatePlayerData(game) {
    $('.PP1-name').text(game.generatedPlayers[0].name);
    $('.PP1-score').text(game.generatedPlayers[0].score);
    $('.PP2-name').text(game.generatedPlayers[1].name);
    $('.PP2-score').text(game.generatedPlayers[1].score);
    $('.PP3-name').text(game.generatedPlayers[2].name);
    $('.PP3-score').text(game.generatedPlayers[2].score);
  },

  updatePlayerScore(game) {
    let index = game.currentRound.getPlayerIndex();
    let score;
    const scoreElement = `.PP${index === 0 ? 3 : index}-score`;
    index = index === 0 ? 2 : index - 1;
    score = game.currentRound.players[index].score;
    $(scoreElement).text(score);
  }
 
};

export default domUpdates;
