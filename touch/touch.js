const src = document.querySelector('.source')
const clientX = document.querySelector('#clientX')
const clientY = document.querySelector('#clientY')
const screenX = document.querySelector('#screenX')
const screenY = document.querySelector('#screenY')

let x = 0
let y = 0

src.addEventListener('touchstart', event => {
  x = event.touches[0].clientX
  y = event.touches[0].clientY
  clientX.textContent = `clientX: ${event.touches[0].clientX}`
  clientY.textContent = `clientY: ${event.touches[0].clientY}`

  screenX.textContent = `screenX: ${event.touches[0].screenX}`
  screenY.textContent = `screenY: ${event.touches[0].screenY}`
}, false)

src.addEventListener('touchend', event => {
  let deltaX = event.changedTouches[0].clientX
  let deltaY = event.changedTouches[0].clientY

  clientX.textContent = `clientX: ${deltaX - x}`
  clientY.textContent = `clientY: ${deltaY - y}`
}, false)