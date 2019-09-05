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
    this.selectClueOptionsForRound();
    this.generateRound();
  }

  newRound() {
    this.generateCategories();
    this.selectClueOptionsForRound();
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

  selectClueOptionsForRound() {
    this.clues = [];

    let currentCategoriesIds = this.currentCategories.map(category => category.id);
    let fourClueTopics = currentCategoriesIds.map(id => {
      return this.data.clues.reduce((acc, currentClue) => {
        if (currentClue.categoryId === id) {
          acc.push(currentClue)
        }
        return acc
      }, [])
    })

    this.arrangeCluesByPoints(fourClueTopics);
  }
    

  arrangeCluesByPoints(currentClueTopics) {
    let pointValues = [100, 200, 300, 400];

    let filteredClueArrays = currentClueTopics.map(currentClueTopic => {
      return pointValues.map(currentPointValue => {
        return currentClueTopic.reduce((acc, currentClue) => {
          if (currentClue.pointValue === currentPointValue) {
            acc.push(currentClue)
          }
          return acc;
        }, []);
      });
    });
    
    this.generateCluesForRound(filteredClueArrays);
  }
    
  generateCluesForRound(organizedClues) {

    let sixteenClues = organizedClues.reduce((finalClues, currentClues) => {
      currentClues.forEach(pointValues => {
        let randomIndex = Math.floor(Math.random() * (pointValues.length - 1));
        finalClues.push(pointValues[randomIndex])
      })
      return finalClues
    }, [])

    this.clues = sixteenClues;
  }

  generateRound() {
    if (this.roundCounter === 1) {
      this.currentRound = new Round(this, this.generatedPlayers, this.clues);
    } else if (this.roundCounter === 2) {
      
      this.clues = this.clues.map(clue => {
        return {
          question: clue.question,
          pointValue: clue.pointValue * 2,
          answer: clue.answer,
          categoryId: clue.categoryId
        };
      });
      this.currentRound = new Round(this, this.generatedPlayers, this.clues);
    } else {
      this.roundCounter++;
    }
  }

  //Every time a user takes a guess fire this
  //Would be better if only fired when user makes correct guess
  //? if(this.round.currentClue.answer === $input.val() FIRE ?)
  nextRoundHandler() {
    //this.isRoundOver() &&  <-- Add to if statement below later after making more mock data for each round
    if (this.roundCounter <= 2) {
      this.roundCounter++;
      this.newRound();
    } else {
      this.roundCounter++;
      //this.finalRound() or add to this.generateRound()
      console.log('Time for round 3');
    }
  }
  //if(this.isRoundOver() && this.roundCounter === 2) <-- Add to else block later
  //Add else block to handle end of game

  isRoundOver() {
    return this.currentRound.isClueArrayEmpty() ? true : false;
  }


}

export default Game;