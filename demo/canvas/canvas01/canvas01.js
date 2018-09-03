document.addEventListener('DOMContentLoaded', function() {
  const blurWrap = document.querySelector('#blur-wrap')
  const blurImage = document.querySelector('#blur-image')
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')

  let width = 0,
    height = 0,
    r = 50,
    clippingRegion = {
      x: -1,
      y: -1,
      r: r
    },
    leftMargin = 0,
    topMargin = 0

  init()

  function init() {
    width = window.innerWidth
    height = window.innerHeight

    blurWrap.style.width = `${width}px`
    blurWrap.style.height = `${height}px`

    canvas.width = width
    canvas.height = height
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
      x: Math.random() * (canvas.width - r * 2 - theLeft * 2) + r + theLeft,
      y: Math.random() * (canvas.height - r * 2 - theTop * 2) + r + theTop,
      r: r
    }
    draw(image, clippingRegion)
  }

  function draw(image, clippingRegion) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    setClippingRegion(clippingRegion)
    let dx = canvas.width / 2 - image.width / 2,
      dy = canvas.height / 2 - image.height / 2
    ctx.drawImage(image, dx, dy, image.width, image.height)
    ctx.restore()
  }

  function setClippingRegion(clippingRegion) {
    ctx.beginPath()
    ctx.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI * 2, false)
    ctx.clip()
  }

  document.querySelector('#reset').addEventListener('click', reset)
  document.querySelector('#show').addEventListener('click', show)

  let interval

  function reset() {
    clearInterval(interval)
    initCanvas()
  }

  function show() {
    if (clippingRegion.r > r) return

    interval = setInterval(function() {
      clippingRegion.r += 15
      if (clippingRegion.r > Math.max(canvas.width, canvas.height) * 2) {
        clearInterval(interval)
      }
      draw(image, clippingRegion)
    }, 30)
  }
})