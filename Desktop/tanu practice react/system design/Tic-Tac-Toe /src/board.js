// board.js
const ROWS = ['A','B','C'];
const COLS = ['1','2','3'];

class Board {
  constructor() {
    // grid as map from coordinate -> symbol
    this.grid = {};
    for (let r of ROWS) {
      for (let c of COLS) {
        this.grid[`${r}${c}`] = '_';
      }
    }
    // lockedCenter holds symbol that is allowed to claim B2 (null if unlocked)
    this.lockedCenter = null;
  }

  display() {
    console.log('\n   1 2 3');
    for (let r of ROWS) {
      const rowVals = COLS.map(c => this.grid[`${r}${c}`]).join(' ');
      console.log(`${r}  ${rowVals}`);
    }
    console.log('');
  }

  isValidCoord(coord) {
    if (!coord || typeof coord !== 'string') return false;
    coord = coord.toUpperCase().trim();
    if (coord.length !== 2) return false;
    const r = coord[0];
    const c = coord[1];
    return ROWS.includes(r) && COLS.includes(c);
  }

  isEmpty(coord) {
    return this.grid[coord] === '_';
  }

  placeSymbol(coord, symbol) {
    this.grid[coord] = symbol;
  }

  get(coord) {
    return this.grid[coord];
  }

  // After a move, check if player has completed both diagonal corners.
  // If player has both corners of either diagonal AND B2 is empty, lock B2 to that player's symbol.
  updateDiagonalLockIfNeeded(playerSymbol) {
    const cornersDiag1 = (this.get('A1') === playerSymbol) && (this.get('C3') === playerSymbol);
    const cornersDiag2 = (this.get('A3') === playerSymbol) && (this.get('C1') === playerSymbol);
    if ((cornersDiag1 || cornersDiag2) && this.get('B2') === '_' ) {
      this.lockedCenter = playerSymbol;
      return true;
    }
    return false;
  }

  // Validate attempting to claim B2 wrt lock rule
  canClaimCenter(playerSymbol) {
    if (this.get('B2') !== '_') return false; // center already taken
    if (this.lockedCenter === null) return true; // not locked to anyone
    return this.lockedCenter === playerSymbol;
  }

  checkWinForSymbol(sym) {
    // rows
    const rows = [['A1','A2','A3'], ['B1','B2','B3'], ['C1','C2','C3']];
    for (let row of rows) {
      if (row.every(cell => this.get(cell) === sym)) return true;
    }
    // cols
    const cols = [['A1','B1','C1'], ['A2','B2','C2'], ['A3','B3','C3']];
    for (let col of cols) {
      if (col.every(cell => this.get(cell) === sym)) return true;
    }
    // diagonals
    const diags = [['A1','B2','C3'], ['A3','B2','C1']];
    for (let d of diags) {
      if (d.every(cell => this.get(cell) === sym)) return true;
    }
    return false;
  }

  checkDraw() {
    return Object.values(this.grid).every(v => v !== '_');
  }
}

module.exports = Board;
