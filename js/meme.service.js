function createMeme(imgId){
    gElCanvas.width = 540
        gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 30,
                font: 'Impact',
                color: 'white',
                strokeColor: 'black',
                align: 'center',
                x: gElCanvas.width / 2,
                y: 50
            },
            {
                txt: 'Meme text sample',
                size: 30,
                font: 'Impact',
                color: 'yellow',
                strokeColor: 'black',
                align: 'center',
                x: gElCanvas.width / 2,
                y: 300
            }
        ]
    }
}

// Get meme
function getMeme(){
    return gMeme
}

// Draw line text
function drawText(txt, size, color, stroke, align, x, y) {
    gCtx.lineWidth = 2
    gCtx.fillStyle = color
    gCtx.strokeStyle = stroke
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

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
        size: size || 30,
        font: font || 'Impact',
        color: color || 'white',
        strokeColor: stroke || 'black',
        align: align || 'center',
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

