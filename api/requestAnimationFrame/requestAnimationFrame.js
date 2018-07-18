let start = null
const div = document.querySelector('div')
const style = div.style
style.position = 'absolute'

function step(timestamp) {
  if (!start) {
    start = timestamp
  }
  const progress = timestamp - start
  style.left = `${Math.min(progress / 10, 200)}px`
  if (progress < 2000) {
    window.requestAnimationFrame(step)
  }
}

window.requestAnimationFrame(step)