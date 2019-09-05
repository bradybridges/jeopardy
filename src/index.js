import $ from 'jquery';

import './css/base.scss';

import './images/splash.gif'

import Game from './Game';

// import domUpdates from './domUpdates.js'

let game;


console.log('This is the JavaScript entry file - your code begins here.');


$(document).ready(function() {
  console.log("MOOOOOOSES")


  $ (function () {
    $('.intake-form-inputs').keyup(function() {
      if ($('.player-one-intake').val() !== '' && $('.player-two-intake').val() !== '' && $('.player-three-intake').val() !== '') {
        $('.start-game-btn').prop('disabled', false);  
      }
    })
  })
  
})

$('.start-game-btn').click(function() {
    let player1 = $('.player-one-intake').val();
    let player2 = $('.player-two-intake').val();
    let player3 = $('.player-three-intake').val();
    
    game = New Game(data, [plauer1, player2, player3])
})

