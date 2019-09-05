import $ from 'jquery';

import './css/base.scss';

import './images/splash.gif';

import Game from './Game';

import domUpdates from './domUpdates.js'

let game;

fetch("https://fe-apps.herokuapp.com/api/v1/gametime/1903/jeopardy/data")
  .then(response => response.json())
  .then(data => data.data)
  .catch(error => console.log(error));


$(document).ready(function() {
  console.log("MOOOOOOSES")

  $('.intake-form-inputs').keyup(function() {
    if ($('.player-one-intake').val() !== '' && $('.player-two-intake').val() !== '' && $('.player-three-intake').val() !== '') {
      $('.start-game-btn').prop('disabled', false);  
    }
  })

//   $('.start-game-btn').click(function() {
//     let player1 = $('.player-one-intake').val();
//     let player2 = $('.player-two-intake').val();
//     let player3 = $('.player-three-intake').val();
    
//     game = new Game(data, [player1, player2, player3])
//   })
  
})

