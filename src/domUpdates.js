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
      e.preventDefault()
      let guess = $('.user-input').val().toLowerCase();
      game.currentRound.takeGuess(guess)

    })
  },
 
};

export default domUpdates;
