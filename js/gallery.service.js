gImgs = [
    { id: '1', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/1.jpg', keywords: ['funny'] },
    { id: '2', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/2.jpg', keywords: ['dog'] },
    { id: '3', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/3.jpg', keywords: ['dog', 'baby'] },
    { id: '4', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/4.jpg', keywords: ['cat'] },
    { id: '5', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/5.jpg', keywords: ['baby', 'funny'] },
    { id: '6', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/6.jpg', keywords: ['funny'] },
    { id: '7', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/7.jpg', keywords: ['baby'] },
    { id: '8', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/8.jpg', keywords: ['funny'] },
    { id: '9', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/9.jpg', keywords: ['baby', 'funny'] },
    { id: '10', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/10.jpg', keywords: ['funny'] },
    { id: '11', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/11.jpg', keywords: ['funny'] },
    { id: '12', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/12.jpg', keywords: ['funny'] },
    { id: '13', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/13.jpg', keywords: ['funny'] },
    { id: '14', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/14.jpg', keywords: ['sad'] },
    { id: '15', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/15.jpg', keywords: ['funny'] },
    { id: '16', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/16.jpg', keywords: ['funny'] },
    { id: '17', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/17.jpg', keywords: ['funny'] },
    { id: '18', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/18.jpg', keywords: ['sad'] },
    { id: '19', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/19.jpg', keywords: ['funny'] },
    { id: '20', url: 'img/meme-imgs/meme-imgs (various aspect ratios)/20.jpg', keywords: ['funny','baby'] },
]

// Get img id
function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

