import data from '../src/data';
import Round from '../src/Round';
import Player from '../src/Player';
import { fileURLToPath } from 'url';

class Game {
  constructor(data, players) {
    this.data = data;
    this.playersList = players;
    this.generatedPlayers;
    this.allCategories = this.data.categories;
    this.currentCategories;
    this.clues;
    this.winner;
    this.roundCounter = 1;
    this.currentRound;
    this.startGame();

  }

  startGame() {
    this.generatePlayers();
    this.manipulateCategories();
    this.generateCategories();
    this.generateClues();
    this.generateRound();
  }

  newRound() {
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
    this.currentCategories = [];
    for (let i = 0; i < 4; i++) {
      let randomCategory = Math.floor(Math.random() * (this.allCategories.length - 1) + 1);
      
      while (this.currentCategories.includes(randomCategory)) {
        randomCategory = Math.floor(Math.random() * (this.allCategories.length - 1) + 1);
      }

      this.currentCategories.push(this.allCategories[randomCategory]);
      this.allCategories.splice(randomCategory, 1);
    }
  }

  generateClues() {
    this.clues = [];
    let currentCategoriesIds = this.currentCategories.map(category => category.id);
    let currentClues = this.data.clues.reduce((acc, clue) => {
      currentCategoriesIds.forEach(id => {
        if (clue.categoryId === id) {
          acc.push(clue)
        }
      })
      return acc
    }, []);
    this.selectCluesForRound(currentClues);
  }

  selectCluesForRound(cluesArray) {
    let fourClueArrays = this.currentCategories.map(category => {
      return cluesArray.reduce((acc, clue) => {
        if (clue.categoryId === category.id) {
          acc.push(clue)
        }
        return acc
      }, [])
    })

    let pointValue = [100, 200, 300, 400];

    let filteredClueArrays = fourClueArrays.map(currentArray => {
      return pointValue.map(currentValue => {
        return currentArray.reduce((acc, currentClue) => {
          if (currentClue.pointValue === currentValue) {
            acc.push(currentClue)
          }
          return acc;
        }, [])
      })
    })

    let drumRole = filteredClueArrays.reduce((acc, currentClueArray) => {
      currentClueArray.forEach(pointArray => {
        let randomIndex = Math.floor(Math.random() * (pointArray.length - 1));
        acc.push(pointArray[randomIndex])
      })
      return acc
    }, [])

    this.clues = drumRole;

    console.log("drumRole", drumRole);

  }

  generateRound() {
    if (this.roundCounter === 1) {
      this.currentRound = new Round(this.generatedPlayers, this.clues);
    } else if (this.roundCounter === 2) {
      
      this.clues = this.clues.map(clue => {
        return {
          question: clue.question,
          pointValue: clue.pointValue * 2,
          answer: clue.answer,
          categoryId: clue.categoryId
        };
      });
      this.currentRound = new Round(this.generatedPlayers, this.clues);
    } else {
      this.roundCounter++;
    }
  }

  //Every time a user takes a guess fire this
  //Would be better if only fired when user makes correct guess
  //? if(this.round.currentClue.answer === $input.val() FIRE ?)
  nextRoundHandler() {
    //this.isRoundOver() &&  <-- Add to if statement below later after making more mock data for each round
    if (this.roundCounter === 1) {
      this.incrementRound();
      this.newRound();
    } else {
      this.incrementRound();
      //this.finalRound() or add to this.generateRound()
      console.log('Time for round 3');
    }
  }
  //if(this.isRoundOver() && this.roundCounter === 2) <-- Add to else block later
  //Add else block to handle end of game

  isRoundOver() {
    return this.currentRound.isClueArrayEmpty() ? true : false;
  }

  incrementRound() {
    this.roundCounter++;
  }

}

export default Game;