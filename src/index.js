import $ from 'jquery';
import './css/base.scss';

import Game from '../Game';
import DOMUpdates from '../DOMUpdates.js';
import Round from '..Round'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

fetch("https://fe-apps.herokuapp.com/api/v1/gametime/1903/jeopardy/data")
  .then(response => response.json())
  .then(data => data)
  .catch(error => console.log(error));

let game
let round
let player

