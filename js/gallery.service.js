gImgs = [
    { id: 1, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/2.jpg', keywords: ['dog'] }
]

// Get img id
function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

// Load img to canvas
function loadImage(imgId, onImageReady) {
    var img = new Image()
    img.src = imgId.url
    img.onload = () => {
        onImageReady(img)
    }
}
