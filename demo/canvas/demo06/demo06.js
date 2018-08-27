const canvas = document.querySelector('#canvas')
const width = canvas.width
const ctx = canvas.getContext('2d')

let radius = width / 2
ctx.translate(radius, radius)
radius *= 0.9

drawClock(ctx, radius)

function drawClock(ctx, radius) {
  drawFace(ctx, radius)
}

function drawFace(ctx, radius) {
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, 2 * Math.PI)
  ctx.fillStyle = 'white'
  ctx.fill()

  const gradient = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05)
  gradient.addColorStop(0, 'gray')
  gradient.addColorStop(0.5, 'white')
  gradient.addColorStop(1, 'gray')
  ctx.strokeStyle = gradient
  ctx.lineWidth = radius * 0.1
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI)
  ctx.fillStyle = 'gray'
  ctx.fill()
}