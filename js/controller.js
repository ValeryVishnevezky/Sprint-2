var gElCanvas
var gCtx
var gMeme
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
}

// Img id click
function onImageClick(imgId) {
    var elGallery = document.querySelector('.meme-gallery')
    elGallery.classList.add('hide')
    var elFooter = document.querySelector('.main-footer')
    elFooter.classList.add('hide')
    var elEditor = document.querySelector('.meme-editor')
    elEditor.classList.remove('hide')
    var elGalleryLink = document.querySelector('.link-gallery')
    elGalleryLink.classList.remove('select-page')
    var elEditorLink = document.querySelector('.link-editor')
    elEditorLink.classList.add('select-page')
    var elSecondFooter = document.querySelector('.second-footer')
    elSecondFooter.classList.add('second-footer-editor')
    elSecondFooter.classList.remove('second-footer-gallery')
    renderMeme(imgId)
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
}

//Render line text
function renderLines() {
    var meme = getMeme()
    meme.lines.forEach(line => drawText(line.txt, line.size, line.color, line.stroke, line.align, line.x, line.y))
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


// Links click
function onLinkGalleryClick() {
    var elGallery = document.querySelector('.meme-gallery')
    elGallery.classList.remove('hide')
    var elFooter = document.querySelector('.main-footer')
    elFooter.classList.remove('hide')
    var elEditor = document.querySelector('.meme-editor')
    elEditor.classList.add('hide')
    var elGalleryLink = document.querySelector('.link-gallery')
    elGalleryLink.classList.add('select-page')
    var elEditorLink = document.querySelector('.link-editor')
    elEditorLink.classList.remove('select-page')
    var elSecondFooter = document.querySelector('.second-footer')
    elSecondFooter.classList.remove('second-footer-editor')
    elSecondFooter.classList.add('second-footer-gallery')

}

function onLinkEditorClick() {
    var elGallery = document.querySelector('.meme-gallery')
    elGallery.classList.add('hide')
    var elFooter = document.querySelector('.main-footer')
    elFooter.classList.add('hide')
    var elEditor = document.querySelector('.meme-editor')
    elEditor.classList.remove('hide')
    var elGalleryLink = document.querySelector('.link-gallery')
    elGalleryLink.classList.remove('select-page')
    var elEditorLink = document.querySelector('.link-editor')
    elEditorLink.classList.add('select-page')
    var elSecondFooter = document.querySelector('.second-footer')
    elSecondFooter.classList.add('second-footer-editor')
    elSecondFooter.classList.remove('second-footer-gallery')
}