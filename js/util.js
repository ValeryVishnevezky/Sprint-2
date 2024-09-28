'use strict'

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
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
    var elGallery = document.querySelector('.search')
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

// Menu
function onToggleMenu() {
    document.body.classList.toggle("menu-open")
}
