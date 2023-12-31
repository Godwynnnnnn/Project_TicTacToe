const xClass = 'x';
const circleClass = 'circle';
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
const cellElements = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const winningMessage = document.querySelector('.winningMessage');
const winningMessageElement = document.getElementById('winningMessage');
let circleTurn

startGame()


function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? circleClass : xClass;

    placeMark(cell, currentClass)

    // Check for Win
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageElement.innerText = 'Draw';
    } else {
        winningMessageElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessage.classList.add('show');
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(xClass)
    board.classList.remove(circleClass)

    if (circleTurn) {
        board.classList.add(circleClass)
    } else {
        board.classList.add(xClass)
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}