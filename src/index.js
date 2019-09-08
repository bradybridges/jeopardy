import $ from 'jquery';

import './css/base.scss';

import './images/splash.gif';

import Game from './Game';

import domUpdates from './domUpdates.js'

let game;
let data;

 fetch("https://fe-apps.herokuapp.com/api/v1/gametime/1903/jeopardy/data")
    .then(dataResponse => dataResponse.json())
    .then(dataResponse => data = dataResponse.data)
    .catch(error => console.log(error));

$(document).ready(function() {
  console.log("MOOOOOOSES")
  
  $('.intake-form-inputs').keyup(function() {
    if ($('.player-one-intake').val() !== '' && $('.player-two-intake').val() !== '' && $('.player-three-intake').val() !== '') {
      $('.start-game-btn').prop('disabled', false);  
    }
  })
  
  $('.start-game-btn').click( (e) => {
    e.preventDefault()
    let player1 = $('.player-one-intake').val();
    let player2 = $('.player-two-intake').val();
    let player3 = $('.player-three-intake').val();
    
    game = new Game(data, [player1, player2, player3])

    domUpdates.appendPlayers(game);
    domUpdates.transitionToFirstRound();
    domUpdates.populateBoard(game.currentCategories, game.clues)
  })

  $('.grid-item').click( (e) => {
    e.preventDefault()
    if (!e.currentTarget.classList.contains('category')) {
      let cardIndex = e.currentTarget.dataset.index
      let cardAnswer = e.currentTarget.dataset.answer
      game.currentRound.setCurrentClue(cardAnswer);
      domUpdates.populateClueInteraction(game.currentRound.currentClue.question, game);
      $(e.currentTarget).wrap("<strike>");
      $(e.currentTarget).off();
    }
  });


  
})

