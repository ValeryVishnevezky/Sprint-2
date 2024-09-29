'use strict'

async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        onSuccess(data.secure_url)
    } catch (err) {
        console.log(err)
    }
}

// Load img to canvas
function loadImage(imgObj, onImageReady) {
    var img = new Image()
    img.src = imgObj.url
    img.onload = () => {
        onImageReady(img)
    }
}

// Load img input to canvas
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result
        img.id = gImgs.length + 1
        img.onload = () => {
            const imgObj = {id: img.id, url: img.src, keywords: []}
            gImgs.push(imgObj)
            createMeme(imgObj.id)
            onImageReady(img)
        }
    }
    reader.readAsDataURL(ev.target.files[0])
}