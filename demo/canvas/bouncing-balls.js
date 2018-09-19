const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const width = (canvas.width = window.innerWidth)
const height = (canvas.height = window.innerHeight)

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function Ball(x, y, velX, velY, color, radius) {
  this.x = x
  this.y = y
  this.velX = velX
  this.velY = velY
  this.color = color
  this.radius = radius
}

Ball.prototype.draw = function() {
  ctx.beginPath()
  ctx.fillStyle = this.color
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
  ctx.fill()
}

Ball.prototype.update = function() {
  if (this.x + this.radius >= width || this.x - this.radius <= 0) {
    this.velX = -this.velX
  }

  if (this.y + this.radius >= height || this.y - this.radius <= 0) {
    this.velY = -this.velY
  }

  this.x += this.velX
  this.y += this.velY
}

Ball.prototype.collisionDetect = function() {
  for (let i = 0; i < balls.length; i++) {
    if (this !== balls[i]) {
      const dx = this.x - balls[i].x
      const dy = this.y - balls[i].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < this.radius + balls[i].radius) {
        balls[i].color = this.color = generateRandomRGBColor()
      }
    }
  }
}

function generateRandomRGBColor() {
  const red = random(0, 255)
  const green = random(0, 255)
  const blue = random(0, 255)

  return `rgb(${red}, ${green}, ${blue})`
}

const balls = []

// define loop that keeps drawing the scene constantly
function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)'
  ctx.fillRect(0, 0, width, height)

  while (balls.length < 25) {
    const ball = new Ball(
      random(0, width),
      random(0, height),
      random(-7, 7),
      random(-7, 7),
      generateRandomRGBColor(),
      random(10, 20)
    )
    balls.push(ball)
  }

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw()
    balls[i].update()
    balls[i].collisionDetect()
  }

  requestAnimationFrame(loop)
}

loop()
