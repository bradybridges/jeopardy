import data from '../src/data';
import Round from '../src/Round';
import Player from '../src/Player';

class Game {
    constructor(data, players) {
        this.playersList = players;
        this.generatedPlayers;
        this.categories;
        this.clues;
        this.winner;
        this.roundCounter;
        this.currentRound;
    }

    generatedPlayers() {
        console.log("id:", this.playersList[playerName])
        this.generatedPlayers = this.playersList.map(playerName => new Player(this.playersList[playerName], playerName));

    }

}

export default Game;