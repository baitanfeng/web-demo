const canvas = document.querySelector('#canvas')
const width = canvas.width
const ctx = canvas.getContext('2d')

let radius = width / 2
ctx.translate(radius, radius)
radius *= 0.9

drawClock(ctx, radius)
setInterval(() => drawClock(ctx, radius), 1000)

function drawClock(ctx, radius) {
  drawFace(ctx, radius)
  drawNumber(ctx, radius)
  drawTime(ctx, radius)
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

function drawNumber(ctx, radius) {
  ctx.font = `${radius * 0.15}px Arial`
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  for (let i = 1; i < 13; i++) {
    const ang = i * Math.PI / 6
    ctx.rotate(ang)
    ctx.translate(0, -radius * 0.85)
    ctx.rotate(-ang)
    ctx.fillText(i.toString(), 0, 0)
    ctx.rotate(ang)
    ctx.translate(0, radius * 0.85)
    ctx.rotate(-ang)
  }
}

function drawTime(ctx, radius) {
  const date = new Date()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  // hour
  hour %= 12
  hour = hour * Math.PI / 6 + minute * Math.PI / (6 * 60) + second * Math.PI / (6 * 60 * 60)
  drawHand(ctx, hour, radius * 0.5, radius * 0.07)

  // minute
  minute = minute * Math.PI / 30 + second * Math.PI / (30 * 60)
  drawHand(ctx, minute, radius * 0.7, radius * 0.05)

  // second
  second = second * Math.PI / 30
  drawHand(ctx, second, radius * 0.9, radius * 0.02)
}

function drawHand(ctx, arc, length, width) {
  ctx.beginPath()
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.moveTo(0, 0)
  ctx.rotate(arc)
  ctx.lineTo(0, -length)
  ctx.stroke()
  ctx.rotate(-arc)
}