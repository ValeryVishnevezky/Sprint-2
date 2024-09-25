







//Download img

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

//Download to canvas

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

//Facebook

function onUploadToFB(url) {
    console.log('url:', url)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}

function onUploadImg() {
    const canvasData = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        console.log('uploadedImgUrl:', uploadedImgUrl)
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