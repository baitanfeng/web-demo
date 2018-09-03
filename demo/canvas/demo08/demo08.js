const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 6; j++) {
    ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)}, ${Math.floor(255 - 42.5 * j)}, 0)`
    ctx.fillRect(j * 25, i * 25, 25, 25)
  }
}

ctx.translate(150, 150)
for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 6; j++) {
    ctx.strokeStyle = `rgb(0, ${Math.floor(255 - 42.5 * i)}, ${Math.floor(255 - 42.5 * j)})`
    ctx.beginPath()
    ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, 2 * Math.PI)
    ctx.stroke()
  }
}