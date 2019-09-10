import $ from 'jquery';

import './css/base.scss';

import './images/splash.gif';
import './images/correct-guess.gif';
import './images/wrong-guess.gif';
import './images/host.gif';
import './images/round-one.jpg';
import './images/round-two.jpg';
// import './images/round-three.jpeg';
import './images/game-fin.jpg';
import './images/player-1-avatar.png';
import './images/player-2-avatar.png';
import './images/player-3-avatar.png';




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
      let cardAnswer = e.currentTarget.dataset.answer
      game.currentRound.setCurrentClue(cardAnswer);
      domUpdates. populateClueHelper(game.currentRound.currentClue.question, game);
      $(e.currentTarget).text('');
      $(e.currentTarget).addClass('picked');
      $(e.currentTarget).off();
      $(e.currentTarget).closest('.grid-item').removeClass('grid-transition');
    }
  });

  $('.grid-item').hover((e) => {
    if (!e.currentTarget.classList.contains('category') && !e.currentTarget.classList.contains('picked')) {
      $(e.currentTarget).closest('.grid-item').toggleClass('grid-transition');
    }
  });


  
})

