
const prompt = require('prompt-sync')({sigint: true});
const Player = require('./player');
const Game = require('./game');

function readPlayer(number) {
  while (true) {
    const name = prompt(`Enter name for Player ${number}: `);
    if (!name || !name.trim()) {
      console.log('Name cannot be empty.');
      continue;
    }
    const symbolRaw = prompt(`Enter single-character symbol for ${name} (must NOT be '_'): `);
    if (!symbolRaw || symbolRaw.length !== 1) {
      console.log('Symbol must be exactly one character.');
      continue;
    }
    const symbol = symbolRaw;
    if (symbol === '_') {
      console.log("Symbol '_' is reserved for empty cells. Choose another symbol.");
      continue;
    }
    return new Player(name.trim(), symbol);
  }
}

function main() {
  console.log('=== Tic-Tac-Toe (Diagonal-Lock Variant) ===');

 
  const p1 = readPlayer(1);

 
  let p2;
  while (true) {
    p2 = readPlayer(2);
    if (p2.symbol === p1.symbol) {
      console.log('Error: Both players cannot use the same symbol. Re-enter Player 2 info.');
      continue;
    }
    break;
  }

  const game = new Game(p1, p2, prompt);
  game.start();
}

main();
