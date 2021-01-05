const x_class = "x";
const circle_class = "circle";
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restart = document.getElementById('restartBtn')
const statusDisplay = document.querySelector('.status-action')
let circleTurn
let xIsNext = true


startGame()

restart.addEventListener('click', startGame)

// starting the game
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(x_class)
        cell.classList.remove(circle_class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true });
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

// checking turns
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? circle_class : x_class
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        xIsNext = !xIsNext
        if (xIsNext) {
            statusDisplay.innerHTML = `${x_class}'s turn`
        } else {
            statusDisplay.innerHTML = `${circle_class}'s turn`
        }
        swapTurns()
        setBoardHoverClass()
    }
}


// winning message and draw ending game
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw !"
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "Player 2 " : "Player 1 " } Wins !`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) ||
            cell.classList.contains(circle_class)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

// swapping turns
function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(x_class)
    board.classList.remove(circle_class)
    if (circleTurn) {
        board.classList.add(circle_class)
    } else {
        board.classList.add(x_class)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}