'use strict'

var gElCanvas
var gCtx
var gMeme
var gLastPos
var gImgs
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    var elGalleryLink = document.querySelector('.link-gallery')
    elGalleryLink.classList.add('select-page')
    var elSecondFooter = document.querySelector('.second-footer')
    elSecondFooter.classList.add('second-footer-gallery')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    renderImgs(gImgs)
}

// Img id click
function onImageClick(imgId) {
    var elGallery = document.querySelector('.meme-gallery')
    elGallery.classList.add('hide')
    var elGallery = document.querySelector('.search')
    elGallery.classList.add('hide')
    var elFooter = document.querySelector('.main-footer')
    elFooter.classList.add('hide')
    var elEditor = document.querySelector('.meme-editor')
    elEditor.classList.remove('hide')
    var elEditor = document.querySelector('.back-to-gallery')
    elEditor.classList.remove('hide')
    var elGalleryLink = document.querySelector('.link-gallery')
    elGalleryLink.classList.remove('select-page')
    var elEditorLink = document.querySelector('.link-editor')
    elEditorLink.classList.add('select-page')
    var elSecondFooter = document.querySelector('.second-footer')
    elSecondFooter.classList.add('second-footer-editor')
    elSecondFooter.classList.remove('second-footer-gallery')
    createMeme(imgId)
    renderMeme(imgId)
}

// Render imgs on gallery
function renderImgs(imgs) {
    const elGallery = document.querySelector('.meme-gallery')
    const strHtmls = imgs.map(img => `
            <img class='img-gallery' src="${img.url}" alt="${img.keywords}" onclick="onImageClick('${img.id}')"/>
    `)
    elGallery.innerHTML = strHtmls.join('')
}

// Filter mem by keywords
function onSetFilter() {
    const elKeyWords = document.querySelector('.search-panel .search-text')
    const keyWords = elKeyWords.value.toLowerCase()
    const filteredImgs = gImgs.filter(img => img.keywords.some(keywords => keywords.toLowerCase().includes(keyWords)))
    renderImgs(filteredImgs)
    return filteredImgs
}

// Render meme
function renderMeme(imgId) {
    var img = getImgById(imgId)
    loadImage(img, renderImg)
}

// Render image
function renderImg(img) {
    gElCanvas.width = 540
    gElCanvas.height = (img.naturalHeight * gElCanvas.width) / img.naturalWidth
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    renderLines()
}

//Render line text
function renderLines() {
    var meme = getMeme()
    meme.lines.forEach((line, idx) => {
        drawText(line.txt, line.size, line.font, line.color, line.strokeColor, line.align, line.x, line.y,)
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
        if (idx === meme.selectedLineIdx) {
            drawLine(startX, line.y + line.size - 10, endX, line.y + line.size - 10)
        }
    })
    renderMeme(meme.selectedImgId)
}

// Add line on canvas
function onAddLine() {
    var elText = document.querySelector('input[name="meme-text"]')
    var lineText = elText.value
    setLineTxt(lineText)
    renderLines()
}

// Set line text
function onSetText() {
    var elText = document.querySelector('input[name="meme-text"]')
    var lineText = elText.value
    var selectedLine = getLine()
    selectedLine.txt = lineText
    renderLines()
}

// Set color for text
function onSetFillColor(color) {
    var meme = getMeme()
    var addedLine = meme.lines[meme.selectedLineIdx]
    addedLine.color = color
    renderLines()
}
function onSetStrokeColor(color) {
    var meme = getMeme()
    var addedLine = meme.lines[meme.selectedLineIdx]
    addedLine.strokeColor = color
    renderLines()
}

// Switch line idx
function onSwitchLine() {
    var meme = getMeme()
    var currLineIdx = meme.selectedLineIdx
    if (currLineIdx >= meme.lines.length - 1) {
        currLineIdx = 0
    } else {
        currLineIdx++
    }
    meme.selectedLineIdx = currLineIdx
    renderLines()
}

// Delete line
function onDeleteLine() {
    var meme = getMeme()
    var currLineIdx = meme.selectedLineIdx
    meme.lines.splice(currLineIdx, 1)
    if (currLineIdx >= meme.lines.length) {
        meme.selectedLineIdx = meme.lines.length - 1
    }
    renderMeme(meme.selectedImgId)
    renderLines()
}

// Font change
function onFontChange() {
    var fontSelect = document.querySelector('.font')
    var selectedFont = fontSelect.value
    var meme = getMeme()
    var selectedLine = meme.lines[meme.selectedLineIdx]
    selectedLine.font = selectedFont
    renderLines()
}

// Font up
function onFontUp() {
    var meme = getMeme()
    var selectedLine = meme.lines[meme.selectedLineIdx]
    selectedLine.size = selectedLine.size + 10
    renderLines()
}

// Font down
function onFontDown() {
    var meme = getMeme()
    var selectedLine = meme.lines[meme.selectedLineIdx]
    selectedLine.size = selectedLine.size - 10
    renderLines()
}

// Text left
function onTextLeft() {
    var meme = getMeme()
    var selectedLine = meme.lines[meme.selectedLineIdx]
    selectedLine.align = 'left'
    renderLines()
}

// Text center
function onTextCenter() {
    var meme = getMeme()
    var selectedLine = meme.lines[meme.selectedLineIdx]
    selectedLine.align = 'center'
    renderLines()
}

// Text right
function onTextRight() {
    var meme = getMeme()
    var selectedLine = meme.lines[meme.selectedLineIdx]
    selectedLine.align = 'right'
    renderLines()
}

// Line move with cursor/touch 
function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    setLineDrag(true)
    gLastPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = getLine()
    if (!isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gLastPos.x
    const dy = pos.y - gLastPos.y
    moveLine(dx, dy)
    gLastPos = pos
    renderLines()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'auto'
}

//Download img
function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

// Add user img
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

//Facebook
function onUploadToFB(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}

function onUploadImg() {
    const canvasData = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <p>Image url: ${uploadedImgUrl}</p>
        <button class="btn-facebook" target="_blank" onclick="onUploadToFB('${encodedUploadedImgUrl}')">
        Share on Facebook  
        </button>`
    }
    uploadImg(canvasData, onSuccess)
}


// Links click
function onLinkGalleryClick() {
    var elGallery = document.querySelector('.meme-gallery')
    elGallery.classList.remove('hide')
    var elGallery = document.querySelector('.search')
    elGallery.classList.remove('hide')
    var elFooter = document.querySelector('.main-footer')
    elFooter.classList.remove('hide')
    var elEditor = document.querySelector('.meme-editor')
    elEditor.classList.add('hide')
    var elEditor = document.querySelector('.back-to-gallery')
    elEditor.classList.add('hide')
    var elGalleryLink = document.querySelector('.link-gallery')
    elGalleryLink.classList.add('select-page')
    var elEditorLink = document.querySelector('.link-editor')
    elEditorLink.classList.remove('select-page')
    var elSecondFooter = document.querySelector('.second-footer')
    elSecondFooter.classList.remove('second-footer-editor')
    elSecondFooter.classList.add('second-footer-gallery')
    var elEditorLink = document.querySelector('.share-container')
    elEditorLink.classList.add('hide')
}
function onLinkEditorClick() {
    var elGallery = document.querySelector('.meme-gallery')
    elGallery.classList.add('hide')
    var elGallery = document.querySelector('.search')
    elGallery.classList.add('hide')
    var elFooter = document.querySelector('.main-footer')
    elFooter.classList.add('hide')
    var elEditor = document.querySelector('.meme-editor')
    elEditor.classList.remove('hide')
    var elEditor = document.querySelector('.back-to-gallery')
    elEditor.classList.remove('hide')
    var elGalleryLink = document.querySelector('.link-gallery')
    elGalleryLink.classList.remove('select-page')
    var elEditorLink = document.querySelector('.link-editor')
    elEditorLink.classList.add('select-page')
    var elSecondFooter = document.querySelector('.second-footer')
    elSecondFooter.classList.add('second-footer-editor')
    elSecondFooter.classList.remove('second-footer-gallery')
    var elEditorLink = document.querySelector('.share-container')
    elEditorLink.classList.remove('hide')
}
// Menu
function onToggleMenu() {
    document.body.classList.toggle("menu-open")
}