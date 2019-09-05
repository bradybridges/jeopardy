import $ from 'jquery';
import './css/base.scss';

import Game from './Game';
import DOMUpdate from './DOMUpdate';

import './images/tron-grid-green-gif.gif'
import './images/turing-logo.png'

fetch("https://fe-apps.herokuapp.com/api/v1/gametime/1903/jeopardy/data")
  .then(response => response.json())
  .then(data => data.data)
  .catch(error => console.log(error));

let game;

$(function() {


    
});

