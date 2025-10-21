
const Board = require('./board');

class Game {
  constructor(player1, player2, prompt) {
    this.board = new Board();
    this.players = [player1, player2];
    this.currentIndex = 0;
    this.prompt = prompt; 
    this.ended = false;
  }

  getCurrentPlayer() {
    return this.players[this.currentIndex];
  }

  switchTurn() {
    this.currentIndex = 1 - this.currentIndex;
  }

  async start() {
    console.log(`\nStarting Tic-Tac-Toe (Diagonal-Lock Variant)`);
    while (!this.ended) {
      this.board.display();
      const player = this.getCurrentPlayer();
      const coordRaw = this.prompt(`${player.name} (${player.symbol}) - enter your move (e.g., A1): `);
      if (coordRaw === null) { 
        console.log('Input ended unexpectedly. Exiting.');
        break;
      }
      const coord = coordRaw.toUpperCase().trim();

     
      if (!this.board.isValidCoord(coord)) {
        console.log('Error: Invalid coordinate. Use A1..C3.');
        continue;
      }

     
      if (coord === 'B2') {
        if (this.board.get('B2') !== '_') {
          console.log('Error: B2 is already taken.');
          continue;
        }
        if (!this.board.canClaimCenter(player.symbol)) {
          if (this.board.lockedCenter === null) {
            
            console.log('Error: Cannot claim center right now.');
          } else {
            console.log(`Error: Center (B2) is locked to symbol '${this.board.lockedCenter}'. Only that player can claim it.`);
          }
          continue;
        }
      } else {
       
        if (!this.board.isEmpty(coord)) {
          console.log('Error: Cell already filled. Try another cell.');
          continue;
        }
      }

    
      if (!this.board.isEmpty(coord)) {
       
        console.log('Error: Cell already filled. Try another cell.');
        continue;
      }

      this.board.placeSymbol(coord, player.symbol);

      const locked = this.board.updateDiagonalLockIfNeeded(player.symbol);
      if (locked) {
        console.log(`Diagonal lock triggered: center B2 is now locked to '${player.symbol}'.`);
      }

  
      if (this.board.checkWinForSymbol(player.symbol)) {
        this.board.display();
        console.log(`🎉 ${player.name} (${player.symbol}) wins!`);
        this.ended = true;
        break;
      }

   
      if (this.board.checkDraw()) {
        this.board.display();
        console.log("It's a draw! No one wins.");
        this.ended = true;
        break;
      }

      
      this.switchTurn();
    } 
    console.log('Game over.');
  }
}

module.exports = Game;
