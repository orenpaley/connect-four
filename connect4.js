/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT ; y++) {
    board.push([]);
    for (let x = 0 ; x < WIDTH; x++) {
      board[y].push(null)
    }
  }
  return board
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
 const htmlBoard = document.querySelector('#board')
  // TODO: add comment for this code

  // creates html ele for first row in table
  const top = document.createElement("tr"); 
  // sets the id selector to 'coloumn-top' for this table row ele
  top.setAttribute("id", "column-top");
  // adds a listener for click interactions and passes 
  //in a function to run additonal code for that click
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH ; x++) {
    // creates a new cell for each table row HEADER 
    const headCell = document.createElement("td");
    // sets selector to id of the value of loop iterator (width => 0)
    headCell.setAttribute("id", x);
    console.log(headCell)
    // appends the iterated value to first table row variable top
    top.append(headCell);
  }
  // adds the top table row to 
  htmlBoard.append(top);

  // TODO: add comment for this code
  // sets the y coordinate
  for (let y =  0; y < HEIGHT ; y++) {
    // creates the rows
    const row = document.createElement("tr");
    // sets the x coodrinate
    for (let x = 0; x < WIDTH ; x++) {
      // creates the cells per each row
      const cell = document.createElement("td");
      // sets the id selector of each cell  DYNAMICALLY to 'y-x'
      cell.setAttribute("id", `${y}-${x}`);
      //adds each nested loop iteration of cells to outer row
      row.append(cell);
    }
    //adds each row to outer board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
for (let y = HEIGHT - 1; y >= 0; y--) {
  if (!board[y][x]) {
    console.log('y', y)
    return +y
  }
}
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let piece = document.createElement('div');
  piece.classList.add('piece', `p${currPlayer}`);
  console.log(piece.classList)
  // piece.style.backgroundColor = 'blue'
  let cell = document.getElementById(`${y}-${x}`)
  cell.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(e) {
  console.log('targetid', e.target.id)
  // get x from ID of clicked cell
  let x = +e.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win 
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (checkForTie()) {
    return endGame('its a draw!')
  }

  // switch players
  switchPlayers(currPlayer);
}

function switchPlayers(cur) {
  const current = cur === 1 ? 2 : 1;
  currPlayer = current;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  // _win enables accessiblity as a variable? local instance?
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // y (height) is constant while x (width) is increment by 1
      // each of these values in the horiz array 
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      // x (width) is constant while y (height) is increment by 1
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      // adds directional elements going up and right in a ladder formation
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      // adds directional elements going up and left in a ladder formation
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

function checkForTie() {
 return board.every(x => x.every(val => val !== null))
}

makeBoard();
makeHtmlBoard();
