const canvas = document.querySelector('#canvas')
const width = canvas.width
const height = canvas.height

const ctx = canvas.getContext('2d')
ctx.font = '30px Arial'

const gradient = ctx.createLinearGradient(0, 0, width, 0)
gradient.addColorStop(0, 'orange')
gradient.addColorStop(0.5, 'blue')
gradient.addColorStop(1, 'red')

ctx.strokeStyle = gradient
  // ctx.fillStyle = 'red'
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'

ctx.strokeText('Smile!', width / 2, height / 2)