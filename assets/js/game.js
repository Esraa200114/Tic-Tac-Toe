// Global Variables

// Represents the current state of the tic-tac-toe board
let boardArray = ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"];

// Stores the current player of the game
let currentPlayer = "";

// Stores the winner of the game
let winner = "";

// Tracks the score for player "X"
let playerXScore = 0;

// Tracks the score for player O
let playerOScore = 0;

// Tracks the number of draws
let drawScore = 0;

// Indicates if the game ended in a tie
let tie = false;

// Possible winning combinations diagonally
const diagonalPossibilities = [
    [1, 5, 9],
    [3, 5, 7]
];

// Possible winning combinations vertically
const verticalPossibilities = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
];

// Possible winning combinations horizontally
const horizontalPossibilities = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Hexadecimal codes for colors
const redColor = "#EA2027";
const blueColor = "#25CCF7";
const blackColor = "black";
const lightRedColor = "#FFE5FF";
const lightBlueColor = "#dff9fb";

// Constant Strings
const red = "red";
const blue = "blue";
const turnOfPlayerX = "X's turn";
const turnOfPlayerO = "O's turn";
const winnerIsX = "X is the winner!";
const winnerIsO = "O is the winner!";
const x = "x";
const o = "o";

// Sound Effect Files
const winning = new Audio();
winning.src = "assets/sounds/win.mp3";

const tileClick = new Audio();
tileClick.src = "assets/sounds/buttonClick.mp3";

const draw = new Audio();
draw.src = "assets/sounds/tie.mp3";

const buttonClick = new Audio();
buttonClick.src = "assets/sounds/tileClick.mp3";

// Event listener for when the window has finished loading
window.addEventListener('load', function () {

    // Initialize the current player as player "X" for the initial state of the game.
    setCurrentGamePlayer(red, redColor, turnOfPlayerX);

    // Add tiles to the game board.
    addTilesToGameBoard();

    // Add click event listeners for all tiles in the game board.
    addOnClickListenerForAllTiles();

    // Add click event listener for the "Play Again" button.
    addOnClickListenerForPlayAgainButton();
});

// Functions

function setCurrentGamePlayer(colorName, color, currentPlayerIndicatorText) {

    // Set current player to colorName (red, blue).
    // (currentPlayer = red = player "X", currentPlayer = blue = player "O")
    currentPlayer = colorName;
    setTextForCurrentPlayerIndicator(color, currentPlayerIndicatorText)
}

function setTextForCurrentPlayerIndicator(color, currentPlayerIndicatorText) {

    // Set the text of the current player indicator based on the current player.
    let currentPlayerIndicator = document.querySelector(".current-player");
    currentPlayerIndicator.style.color = color;
    currentPlayerIndicator.innerHTML = currentPlayerIndicatorText;
}

function addTilesToGameBoard() {

    // Retrieve the div element of class "board-row".
    let boardRow = document.querySelector(".board-row");

    // Draw the tiles of the game board (9 tiles).
    for (let i = 1; i < 10; i++) {

        // Create the tile.
        let tile = createTile(i);

        // Append the tile to the board.
        boardRow.appendChild(tile);
    }
}

function createTile(id) {

    // Create a div for the tile.
    let tile = document.createElement("div");

    // Assign a unique identifier to the tile.
    tile.id = id;

    // Add classes to the tile's class list.
    addTileClasses(tile);

    return tile;
}

function addTileClasses(tile) {

    // Add classes (col, tile, color, ...) to the tile's class list.
    tile.classList.add("col-3");
    tile.classList.add("tile");
    tile.classList.add("none");
    tile.classList.add("m-1");
    tile.classList.add("p-3");
    tile.classList.add("d-flex");
    tile.classList.add("justify-content-center");
    tile.classList.add("align-items-center");
}

function addOnClickListenerForAllTiles() {

    // Empty tile: is the tile which it's class list contains class "none".

    // Retrieve all empty tiles.
    let emptyTiles = document.querySelectorAll(".none");

    // Loop through each empty tile and add an onclick event listener for each tile.
    emptyTiles.forEach(function (emptyTile) {

        emptyTile.addEventListener("click", function () {

            // Verify if there is no winner, no tie, and the clicked tile has the "none" class.
            // We check if the clicked tile has the "none" class to prevent reassigning its value after it has been marked.
            if (winner === "" && tie === false && emptyTile.classList.contains("none")) {

                // Play "tileClick" sound effect file.
                tileClick.play();
                console.log("Tile clicked.");

                // Remove the "none" class from the classlist of that tile.
                emptyTile.classList.remove("none");

                // Assign the text value of the tile as either "x" or "o" depending on the active player.
                if (currentPlayer === red) {

                    // Mark the tile with "x".
                    markTileBasedOnCurrentPlayer(emptyTile, red, x);

                } else {

                    // Mark the tile with "o".
                    markTileBasedOnCurrentPlayer(emptyTile, blue, o);
                }

                if (isCurrentPlayerAWinner(emptyTile.textContent) === "Game Not Over") {

                    // If the game is ongoing, alternate turns between players.
                    if (currentPlayer === red) {

                        // Switch the current player to "blue" and change the text in the currentPlayer indicator to "O's turn" with text color blue.
                        setCurrentGamePlayer(blue, blueColor, turnOfPlayerO);

                    } else {

                        // Switch the current player to "red" and change the text in the currentPlayer indicator to "X's turn" with text color red.
                        setCurrentGamePlayer(red, redColor, turnOfPlayerX);
                    }
                }
            }
        });
    });
}

function markTileBasedOnCurrentPlayer(tile, colorClass, currentPlayerLetter) {

    // Get the text of the tile which was clicked on.
    let tileID = tile.id;

    // Add the color class (red, blue) to the tile based on the current player.
    tile.classList.add(colorClass);

    let index = parseInt(tileID);

    // Set the text of that tile to the current player letter.
    tile.textContent = currentPlayerLetter;

    // Add the current player's letter to the board array at the index corresponding to the tile's ID.
    boardArray[index] = currentPlayerLetter;
}

function addOnClickListenerForPlayAgainButton() {

    let playAgainBtn = this.document.querySelector(".play-again-btn");
    playAgainBtn.addEventListener('click', function () {

        // Play the "buttonClick" sound effect file.
        buttonClick.play();

        // Reset game variables to their initial values.
        resetGameVariables();

        // Reset board tiles to their original form.
        resetBoardTiles();

        // Set back the original game starter as "red" => player "X".
        setCurrentGamePlayer(red, redColor, turnOfPlayerX);

        // Hide the winning message element.
        let messageElement = document.querySelector(".message");
        messageElement.style.visibility = "hidden";

        // Hide the play again button.
        playAgainBtn.style.visibility = "hidden";
    });
}

function resetGameVariables() {

    // Reset the variables (boardArray, winner and tie) to their original values.  
    boardArray = ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"];
    winner = "";
    tie = false;
}

function resetBoardTiles() {

    // Retrieve board tiles by getting all elements with class "tile".
    let tiles = document.querySelectorAll(".tile");

    // Create an array of tiles from the list of html elements called "tiles".
    tiles = Array.from(tiles);

    // Loop over all tiles in the array and reset each one to its original form.
    tiles.forEach((tile) => {

        // Remove class related to the player (red, blue) from the tile's class list.
        if (tile.classList.contains(red)) {

            // Remove "red" class from the class list of the tile.
            tile.classList.remove(red);

        } else if (tile.classList.contains(blue)) {

            // Remove "blue" class from the class list of the tile.
            tile.classList.remove(blue);
        }

        // Add "none" class to the class list.
        tile.classList.add("none");

        // Add the original text of the tile (tile's id).
        tile.innerHTML = String(tile.id);

        // Resetting tile appearance to default values: color, background, and border.
        tile.style.color = "";
        tile.style.backgroundColor = "";
        tile.style.border = "";

    });
}

function isCurrentPlayerAWinner(playerLetter) {

    // Check if there is a win: diagonally, vertically, or horizontally
    if (checkForWin(playerLetter)) {
        return "Game Over";

    // If there isn't a win diagonally, vertically, or horizontally, check for a tie.
    } else if (isATie()) {
        handleTie();
        return "Game Over";
    } else {
        return "Game Not Over";
    }
}

function checkForWin(playerLetter) {
    
    // Checking for a win: diagonally, vertically, or horizontally
    return (
        checkForAWin(playerLetter, diagonalPossibilities) ||
        checkForAWin(playerLetter, verticalPossibilities) ||
        checkForAWin(playerLetter, horizontalPossibilities)
    );
}

function handleTie() {

    // Play "draw" sound effect file.
    draw.play();
    console.log("It's a tie.");

    // Increment the score of draws.
    drawScore += 1;

    // Change the text of the score indicator for draws.
    setTextForScoreIndicator(".draw-score", drawScore, true)

    // Change texts of the "Info" section.
    setTextForCurrentPlayerIndicator(blackColor, "Draw!");
    setTextForMessageElement("It's a draw");

    // Change the background and border colors of the tie tiles.
    setColorForTieTiles();

    // Set the visibility of the play again button to "visible".
    let playAgainBtn = document.querySelector(".play-again-btn");
    playAgainBtn.style.visibility = "visible";
}

function checkForAWin(playerLetter, winWayPossibilitiesArray) {

    // Iterate over array of possibilities based on the way of winning.
    for (let i = 0; i < winWayPossibilitiesArray.length; i++) {

        const possibility = winWayPossibilitiesArray[i];
        const [a, b, c] = possibility;

        // Check if all elements in the possibility are equal to playerLetter.
        if (playerLetter === boardArray[a] && boardArray[a] === boardArray[b] && boardArray[b] === boardArray[c]) {
            return colorWinningTiles(playerLetter, a, b, c);
        }
    }

    return false;
}

function isATie() {

    // Count the non-empty elements in the board array, where each element contains either "x" or "o".
    let count = 0;
    boardArray.forEach((element) => {
        if (element !== "#") {
            count++;
        }
    });

    // Determine if the game is tied by checking if all board elements are filled.
    if (count === 9) {
        tie = true;
        return true;
    }

    return false;
}

function setColorForTieTiles() {

    // Iterate over all tiles by id and change it's text, background and border colors.
    for (let i = 1; i < 10; i++) {

        let tile = document.getElementById(String(i));
        tile.style.backgroundColor = "#E6F7D8";
        tile.style.color = "#009432";
        tile.style.borderColor = "#009432";
    }
}

function colorWinningTiles(playerLetter, tileID1, tileID2, tileID3) {

    // Retrieve the winning tiles by their IDs.
    let tile1 = document.getElementById(String(tileID1));
    let tile2 = document.getElementById(String(tileID2));
    let tile3 = document.getElementById(String(tileID3));

    // Play "winning" sound effect file.
    winning.play();
    console.log(playerLetter.toUpperCase() + " has won!");

    if (playerLetter === x) {

        // Set the winner as player "X".
        setWinner(tile1, tile2, tile3, x, lightRedColor, redColor);

        // Set the score for player "X".
        setTextForScoreIndicator(".player-X-score", playerXScore, false);

        // Set the current player indicator text to indicate that player "X" has won.
        setTextForCurrentPlayerIndicator(redColor, winnerIsX);

    } else {

        // Set the winner as player "O".
        setWinner(tile1, tile2, tile3, o, lightBlueColor, blueColor);

        // Set the score for player "O".
        setTextForScoreIndicator(".player-O-score", playerOScore, false);

        // Set the current player indicator text to indicate that player "O" has won.
        setTextForCurrentPlayerIndicator(blueColor, winnerIsO);

    }

    // Set the text of the message element.
    setTextForMessageElement("Congratulations");

    // Display the play again button.
    setPlayAgainButtonVisibility();

    return true;
}

function setWinner(tile1, tile2, tile3, winnerLetter, backgroundColor, borderColor) {

    // Set the winner as either "x" or "o".
    winner = winnerLetter;

    // Change the background and border colors of the tiles based on the winner.
    tile1.style.backgroundColor = backgroundColor;
    tile2.style.backgroundColor = backgroundColor;
    tile3.style.backgroundColor = backgroundColor;

    tile1.style.borderColor = borderColor;
    tile2.style.borderColor = borderColor;
    tile3.style.borderColor = borderColor;

    // Increment the score based on the winner.
    if (winner === "x") {

        // Increment the score of player "X".
        playerXScore += 1;

    } else {

        // Increment the score of player "O".
        playerOScore += 1;
    }
}

function setTextForScoreIndicator(scoreIndicatorID, score, isDraw) {

    // Change the text of the score indicator based on the score value and whether it's a draw or not.
    let scoreIndicator = document.querySelector(scoreIndicatorID);
    if (score === 1) {
        if (isDraw) {
            scoreIndicator.innerHTML = "1 draw";
        } else {
            scoreIndicator.innerHTML = "1 win";
        }
    } else {
        if (isDraw) {
            scoreIndicator.innerHTML = score + " draws";
        } else {
            scoreIndicator.innerHTML = score + " wins";
        }
    }
}

function setTextForMessageElement(message) {

    // Set the text and visibility of the message element.
    let messageElement = document.querySelector(".message");
    messageElement.innerHTML = message;
    messageElement.style.visibility = "visible";
}

function setPlayAgainButtonVisibility() {

    // Set the visibility of the play again button to "visible".
    let playAgainBtn = document.querySelector(".play-again-btn");
    playAgainBtn.style.visibility = "visible";
}