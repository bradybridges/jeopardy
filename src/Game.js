import data from '../src/data';
import Round from '../src/Round';
import Player from '../src/Player';

class Game {
  constructor(data, players) {
    this.data = data;
    this.playersList = players;
    this.generatedPlayers;
    this.allCategories = this.data.categories;
    this.currentCategories = [];
    this.clues;
    this.winner;
    this.roundCounter;
    this.currentRound;
  }

  startGame() {
    this.generatePlayers();
  }

  generatePlayers() {
    this.generatedPlayers = this.playersList.map(playerName => new Player(this.playersList.indexOf(playerName) + 1, playerName));
  }


  generateCategories() {
    this.allCategories = Object.keys(this.data.categories);
    for (let i = 0; i < 4; i++) {
      let randomCategory = Math.round(Math.random() * (this.allCategories.length));
      this.currentCategories.push(this.allCategories[randomCategory]);
      this.allCategories.splice(randomCategory, 1);
    }
    return this.currentCategories;
  }


}

export default Game;