const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const grd = ctx.createLinearGradient(0, 0, 200, 0)
grd.addColorStop(0, 'red')
grd.addColorStop(1, 'white')

ctx.fillStyle = grd
ctx.fillRect(0, 0, 200, 100)