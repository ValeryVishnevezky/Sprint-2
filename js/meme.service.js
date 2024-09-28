'use strict'

function createMeme(imgId) {
    gElCanvas.width = 540
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 40,
                font: 'Impact',
                color: 'white',
                strokeColor: 'black',
                align: 'center',
                x: gElCanvas.width / 2,
                y: 50,
                isDrag: false
            },
            {
                txt: 'Meme text sample',
                size: 40,
                font: 'Impact',
                color: 'yellow',
                strokeColor: 'black',
                align: 'center',
                x: gElCanvas.width / 2,
                y: 300,
                isDrag: false
            }
        ]
    }
}

// Get meme
function getMeme() {
    return gMeme
}

// Get meme line
function getLine() {
    var meme = getMeme()
    var selectedLine = meme.lines[meme.selectedLineIdx]
    return selectedLine
}

// Draw line text
function drawText(txt, size, font, color, stroke, align, x, y) {
    gCtx.lineWidth = 2
    gCtx.fillStyle = color
    gCtx.strokeStyle = stroke
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    if (align === 'left') {
        x = 10
    } else if (align === 'center') {
        x = x
    } else if (align === 'right') {
        x = gElCanvas.width - 10
    }
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

// Draw bottom line on curr line
function drawLine(x, y, xEnd, yEnd) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(xEnd, yEnd)
    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'red'
    gCtx.stroke()
}

// Create new line
function setLineTxt(txt, size, font, color, stroke, align) {
    gMeme.lines.push({
        txt: txt || 'Meme text sample',
        size: size || 40,
        font: font || 'Impact',
        color: color || 'white',
        strokeColor: stroke || 'black',
        align: align || 'center',
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2,
        isDrag: false
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

// Check if line was clicked
function isLineClicked(clickedPos) {
    var meme = getMeme()
    meme.lines.forEach((line, idx) => {
        var text = gCtx.measureText(line.txt)
        var startX
        var endX
        if (line.align === 'left') {
            startX = 10
            endX = 10 + text.width
        } else if (line.align === 'center') {
            startX = line.x - text.width / 2
            endX = line.x + text.width / 2
        } else if (line.align === 'right') {
            startX = gElCanvas.width - 10 - text.width
            endX = gElCanvas.width - 10
        }
        const isClickedX = clickedPos.x >= startX && clickedPos.x <= endX
        const isClickedY = clickedPos.y >= line.y - line.size && clickedPos.y <= line.y + line.size
        if (isClickedX && isClickedY) {
            meme.selectedLineIdx = idx
            renderLines()
        }
    })
    return true
}


function setLineDrag(isDrag) {
    var meme = getMeme()
    var selectedLine = meme.lines[meme.selectedLineIdx]
    selectedLine.isDrag = isDrag
}

function moveLine(dx, dy) {
    var selectedLine = getLine()
    selectedLine.x += dx
    selectedLine.y += dy
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.clientX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.clientY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}