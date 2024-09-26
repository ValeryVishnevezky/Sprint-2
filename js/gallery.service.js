gImgs = [
    { id: 1, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/2.jpg', keywords: ['dog'] },
    { id: 3, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/3.jpg', keywords: ['dog'] },
    { id: 4, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/4.jpg', keywords: ['dog'] },
    { id: 5, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/5.jpg', keywords: ['dog'] },
    { id: 6, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/6.jpg', keywords: ['dog'] },
    { id: 7, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/7.jpg', keywords: ['dog'] },
    { id: 8, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/8.jpg', keywords: ['dog'] },
    { id: 9, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/9.jpg', keywords: ['dog'] },
    { id: 10, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/10.jpg', keywords: ['dog'] },
    { id: 11, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/11.jpg', keywords: ['dog'] },
    { id: 12, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/12.jpg', keywords: ['dog'] },
    { id: 13, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/13.jpg', keywords: ['dog'] },
    { id: 14, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/14.jpg', keywords: ['dog'] },
    { id: 15, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/15.jpg', keywords: ['dog'] },
    { id: 16, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/16.jpg', keywords: ['dog'] },
    { id: 17, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/17.jpg', keywords: ['dog'] },
    { id: 18, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/18.jpg', keywords: ['dog'] },
    { id: 19, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/19.jpg', keywords: ['dog'] },
    { id: 20, url: 'img/meme-imgs/meme-imgs (various aspect ratios)/20.jpg', keywords: ['dog'] },
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
        createMeme(img.id)
        renderLines()
    }
    img.onerror = () => {
        console.error('Error in img loading')
    }
}
