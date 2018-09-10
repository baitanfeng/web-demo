const button = document.querySelector('.media__button')

button.addEventListener('click', handleButtonClick, false)

function handleButtonClick(evt) {
  const constraints = {
    audio: true,
    video: true
  }

  navigator.mediaDevices.getUserMedia(constraints)
    .then(ms => {
      alert(ms.toString())
      const video = document.querySelector('video')
      video.srcObject = ms
      video.onloadedmetadata = () => video.play()
    })
    .catch(err => {
      console.log(`name: ${err.name}, message: ${err.message}`)
    })
}