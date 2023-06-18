function drawCircles() {
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    ctx.fillStyle = "blue"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    let y = 50, yAxis = 0
    for (let i = 0; i < row; ++i) {
        gameBoard[i] = []
        let xAxis = 0, x = 50
        y += yAxis
        for (let j = 0; j < column; ++j) {
            gameBoard[i][j] = -1
            x += xAxis
            let region = new Path2D()
            region.arc(x, y, radius, 0, Math.PI * 2)
            ctx.fillStyle = "white"
            ctx.fill(region)
            xAxis = 100
        }
        yAxis = 100
    }
    showTheCurrentPlayer(currentPlayer)
    canvas.addEventListener("click", clickOnCanvas)
}

let gameBoard = []
let row = 6
let column = 7
let currentPlayer = -1

function showTheCurrentPlayer(currentPlayer) {
    let theCurrentPlayer = document.getElementById("theCurrentPlayer")
    let ctx = theCurrentPlayer.getContext("2d")
    ctx.fillStyle = "blue"
    ctx.fillRect(0, 0, theCurrentPlayer.width, theCurrentPlayer.height)
    let region = new Path2D()
    region.arc(hundred, hundred, fifty, 0, Math.PI * 2)
    ctx.fillStyle = "red"
    ctx.fill(region)
    ctx.fillStyle = "black"
    ctx.font = "30px serif"
    ctx.fillText("Current Player", 10, 35)
    if (currentPlayer % 2 == 0 && currentPlayer != -1) {
        ctx.fillStyle = "purple"
        ctx.fill(region)
    } else if (currentPlayer % 2 != 0 && currentPlayer != -1) {
        ctx.fillStyle = "red"
        ctx.fill(region)
    }
}

let frequency = new Array(7).fill(0)
let hundred = 100, fifty = 50, radius = 45

function clickOnCanvas(event) {
    ++currentPlayer
    ctx = canvas.getContext("2d")
    let elemLeft = canvas.offsetLeft
    let x = event.pageX - elemLeft
    let x1 = Math.floor(x / 100),
        y1 = 5 - frequency[x1]
    if (frequency[x1] + 1 > 6) {
        return
    }
    if (currentPlayer % 2 == 0) {
        region = new Path2D()
        region.arc(x1 * hundred + fifty, 600 - (frequency[x1] * hundred + fifty), radius, 0, Math.PI * 2)
        ctx.fillStyle = "red"
        ctx.fill(region)
        frequency[x1] += 1
        gameBoard[y1][x1] = 0
    } else if (currentPlayer % 2 != 0) {
        region = new Path2D()
        region.arc(x1 * hundred + fifty, 600 - (frequency[x1] * hundred + fifty), radius, 0, Math.PI * 2)
        ctx.fillStyle = "purple"
        ctx.fill(region)
        frequency[x1] += 1
        gameBoard[y1][x1] = 1
    }
    if (currentPlayer % 2 == 0 && gameBoard[y1][x1] == 1) {
        --currentPlayer
    } else if (currentPlayer % 2 != 0 && gameBoard[y1][x1] == 0) {
        --currentPlayer
    }
    showTheCurrentPlayer(currentPlayer)
    checkLines(y1, x1)
    checkColumn(x1)
    checkMainDiagonals(x1, y1)
    checkSecondaryDiagonals(x1, y1)
}

function checkLines(y1, x1) {
    let winerOnTheLines = 1, showTheWiner = 0, xPosition = 0
    for (let i = 0; i < column; ++i) {
        if (gameBoard[y1][i] == gameBoard[y1][i + 1] && gameBoard[y1][i] != -1) {
            ++winerOnTheLines
            if (winerOnTheLines == 4 || winerOnTheLines == 7) {
                xPosition = i + 1
                showTheWiner = winerOnTheLines
            }
        } else {
            winerOnTheLines = 1
        }

    }
    while (showTheWiner) {
        let ctx = canvas.getContext("2d")
        let region = new Path2D()
        region.arc(xPosition * hundred + fifty, 600 - ((frequency[x1] - 1) * hundred + fifty), radius, 0, Math.PI * 2)
        ctx.filter = "drop-shadow(-9px 9px 6px white)"
        ctx.fill(region)
        --showTheWiner
        --xPosition
        canvas.style.pointerEvents = "none"
    }
}

function checkColumn(x1) {
    let winerFromTheColumns = 1, showTheWiner = 0, yPosition = 0
    for (let i = row - 1; i > 0; --i) {
        if (gameBoard[i - 1][x1] == gameBoard[i][x1] && gameBoard[i][x1] != -1) {
            ++winerFromTheColumns
            if (winerFromTheColumns == 4 || winerFromTheColumns == 6) {
                showTheWiner = winerFromTheColumns
                yPosition = i - 1
            }
        } else {
            winerFromTheColumns = 1
        }
    }
    while (showTheWiner) {
        let ctx = canvas.getContext("2d")
        let region = new Path2D()
        region.arc(x1 * hundred + fifty, yPosition * hundred + fifty, radius, 0, Math.PI * 2)
        ctx.filter = "drop-shadow(-9px 9px 6px white)"
        ctx.fill(region)
        --showTheWiner
        ++yPosition
        canvas.style.pointerEvents = "none"
    }
}

function checkMainDiagonals(x1, y1) {
    let winerOnTheMainDiagonals = 1, copyX1 = x1, copyY1 = y1
    let xPosition = 0, yPosition = 0, showTheWiner = 0
    while (copyX1 != 0 && copyY1 != 0) {
        --copyX1
        --copyY1
    }
    while (copyX1 != 6 && copyY1 != 5) {
        if (gameBoard[copyY1][copyX1] == gameBoard[copyY1 + 1][copyX1 + 1] && gameBoard[copyY1][copyX1] != -1) {
            ++winerOnTheMainDiagonals
            if (winerOnTheMainDiagonals == 4 || (winerOnTheMainDiagonals == 5 && (copyY1 + 2 == 6 || copyX1 + 2 == 7)) || (winerOnTheMainDiagonals == 6 && (copyX1 + 2 == 7 || copyY1 + 2 == 6))) {
                xPosition = copyX1 + 1,
                    yPosition = copyY1 + 1
                showTheWiner = winerOnTheMainDiagonals
            }
        } else {
            winerOnTheMainDiagonals = 1
        }
        ++copyX1
        ++copyY1
    }
    while (showTheWiner) {
        let ctx = canvas.getContext("2d")
        let region = new Path2D()
        region.arc(xPosition * hundred + fifty, yPosition * hundred + fifty, radius, 0, Math.PI * 2)
        ctx.filter = "drop-shadow(-9px 9px 6px white)"
        ctx.fill(region)
        --xPosition
        --yPosition
        --showTheWiner
        canvas.style.pointerEvents = "none"
    }
}

function checkSecondaryDiagonals(x1, y1) {
    let winerOnTheSecondDiagonals = 1, copyX1 = x1, copyY1 = y1
    let xPosition = 0, yPosition = 0, showTheWiner = 0
    while (copyX1 != 6 && copyY1 != 0) {
        --copyY1
        ++copyX1
    }
    while (copyX1 != 0 && copyY1 != 5) {
        if (gameBoard[copyY1][copyX1] == gameBoard[copyY1 + 1][copyX1 - 1] && gameBoard[copyY1][copyX1] != -1) {
            ++winerOnTheSecondDiagonals
            if (winerOnTheSecondDiagonals == 4 || (winerOnTheSecondDiagonals == 5 && (copyY1 + 2 == 6 || copyX1 - 2 == -1)) || (winerOnTheSecondDiagonals == 6 && (copyX1 - 2 == -1 || copyY1 + 2 == 6))) {
                xPosition = copyX1 - 1,
                    yPosition = copyY1 + 1
                showTheWiner = winerOnTheSecondDiagonals
            }
        } else {
            winerOnTheSecondDiagonals = 1
        }
        ++copyY1
        --copyX1
    }
    while (showTheWiner) {
        let ctx = canvas.getContext("2d")
        let region = new Path2D()
        region.arc(xPosition * hundred + fifty, yPosition * hundred + fifty, radius, 0, Math.PI * 2)
        ctx.filter = "drop-shadow(-9px 9px 6px white)"
        ctx.fill(region)
        ++xPosition
        --yPosition
        --showTheWiner
        canvas.style.pointerEvents = "none"
    }
}

function resetTheGame() {
    currentPlayer = -1
    frequency = new Array(7).fill(0)
    canvas.style.pointerEvents = "visible"
    ctx = canvas.getContext("2d")
    ctx.reset()
    drawCircles()
}

window.onload = drawCircles
