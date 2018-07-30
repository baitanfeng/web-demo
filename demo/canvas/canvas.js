document.addEventListener('DOMContentLoaded', function() {
  let blurDiv = document.querySelector('#blur-div')
  let blurImage = document.querySelector('#blur-image')
  let canvas = document.querySelector('#canvas')
  let context = canvas.getContext('2d')

  let wWidth = 0,
    wHeight = 0,
    radius = 50,
    clippingRegion = {
      x: -1,
      y: -1,
      r: radius
    },
    leftMargin = 0,
    topMargin = 0

  init()

  function init() {
    wWidth = window.innerWidth
    wHeight = window.innerHeight

    blurDiv.style.width = `${wWidth}px`
    blurDiv.style.height = `${wHeight}px`

    canvas.width = wWidth
    canvas.height = wHeight
  }

  let image = new Image()
  image.src = 'image.jpg'
  image.onload = function() {
    initImage()
    initCanvas()
  }

  function initImage() {
    let imageWidth = image.width,
      imageHeight = image.height,
      canvasWidth = canvas.width,
      canvasHeight = canvas.height

    if (imageWidth / imageHeight > canvasWidth / canvasHeight) {
      image.height = canvasHeight
      image.width = (canvasHeight / imageHeight) * imageWidth
    } else {
      image.width = canvasWidth
      image.height = (canvasWidth / imageWidth) * imageHeight
    }

    blurImage.style.width = `${image.width}px`
    blurImage.style.height = `${image.height}px`

    leftMargin = (image.width - canvas.width) / 2
    topMargin = (image.height - canvas.height) / 2

    blurImage.style.top = `${-topMargin}px`
    blurImage.style.left = `${-leftMargin}px`
  }

  function initCanvas() {
    let theLeft = leftMargin < 0 ? -leftMargin : 0
    let theTop = topMargin < 0 ? -topMargin : 0
    clippingRegion = {
      x: Math.random() * (canvas.width - radius * 2 - theLeft * 2) + radius + theLeft,
      y: Math.random() * (canvas.height - radius * 2 - theTop * 2) + radius + theTop,
      r: radius
    }
    draw(image, clippingRegion)
  }

  function draw(image, clippingRegion) {
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.save()
    setClippingRegion(clippingRegion)
    let dx = canvas.width / 2 - image.width / 2,
      dy = canvas.height / 2 - image.height / 2
    context.drawImage(image, dx, dy, image.width, image.height)
    context.restore()
  }

  function setClippingRegion(clippingRegion) {
    context.beginPath()
    context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI * 2, false)
    context.clip()
  }

  document.querySelector('#reset-button').addEventListener('click', reset)
  document.querySelector('#show-button').addEventListener('click', show)

  let interval

  function reset() {
    clearInterval(interval)
    initCanvas()
  }

  function show() {
    if (clippingRegion.r > radius) return

    interval = setInterval(function() {
      clippingRegion.r += 15
      if (clippingRegion.r > Math.max(canvas.width, canvas.height) * 2) {
        clearInterval(interval)
      }
      draw(image, clippingRegion)
    }, 30)
  }
})