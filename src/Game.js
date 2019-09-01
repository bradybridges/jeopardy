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
    this.roundCounter = 0;
    this.currentRound;
  }

  startGame() {
    this.generatePlayers();
    this.manipulateCategories();
    this.generateCategories();
    this.generateClues();
    this.generateRound();
  }

  generatePlayers() {
    this.generatedPlayers = this.playersList.map(playerName => new Player(this.playersList.indexOf(playerName) + 1, playerName));
  }

  manipulateCategories() {
    let categoryKeys = Object.keys(this.data.categories);
    this.allCategories = categoryKeys.map(currentCategory => {
      let updatedCategory = currentCategory.replace(/([A-Z][a-z])/g, ' $1').replace(/^./, function(str) {
        return str.toUpperCase();
      }) 
      return {name: updatedCategory, id: this.data.categories[currentCategory]}
    })
  }

  generateCategories() {
    for (let i = 0; i < 4; i++) {
      let randomCategory = Math.round(Math.random() * (this.allCategories.length));
      this.currentCategories.push(this.allCategories[randomCategory]);
      this.allCategories.splice(randomCategory, 1);
    }
    return this.currentCategories;
  }

  generateClues() {
    let currentCategoriesIds = this.currentCategories.map(category => category.id);
    let currentClues = this.data.clues.reduce((acc, clue) => {
      currentCategoriesIds.forEach(id => {
        if (clue.categoryId === id) {
          acc.push(clue)
        }
      })
      return acc
    }, []);
    this.clues = currentClues.map(currentClue => {
      console.log('shit', this.roundCounter);
      console.log('yo', currentClue.pointValue * this.roundCounter);
      console.log('line 61:', currentClue);
      return currentClue;
    })
  }

  generateRound() {
    if (this.roundCounter <= 2) {
      this.roundCounter++;
      this.currentRound = 'new Round()'
    }
  }


}

export default Game;