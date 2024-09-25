
var gElCanvas
var gCtx
var gMeme
var gImgs
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    createMeme(1)
    renderMeme()
}

// Render meme
function renderMeme() {
    var meme = getMeme()
    var imgId = getImgById(meme.selectedImgId)
    loadImage(imgId, renderImg)
}

// Render image
function renderImg(img) {
    gElCanvas.width = img.naturalWidth
    gElCanvas.height = img.naturalHeight
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    renderLines()
}

//Render line text
function renderLines() {
    var meme = getMeme()
    meme.lines.forEach(line => drawText(line.txt, line.size, line.color, line.stroke, line.align, line.x, line.y))
}

// Resize canvas
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

//Download img
function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

//Facebook
function onUploadToFB(url) {
    console.log('url:', url)
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


// Menu
const menu = document.querySelector('.main-nav-list')
const btn = document.querySelector('.btn-toggle-menu')

function toggleMenu() {
    document.body.classList.toggle('menu-open');
    onSwitchIcon()
}

function onSwitchIcon() {

    if (document.body.classList.toggle('menu-open')) {
        btn.innerHTML = `<i class="fa-solid fa-xmark"></i>`
    } else {
        btn.innerHTML = `<i class="fa-solid fa-bars"></i>`
    }
}

btn.addEventListener('click', onSwitchIcon)