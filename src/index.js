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

