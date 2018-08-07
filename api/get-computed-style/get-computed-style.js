const div = document.querySelector('.container')
const style = window.getComputedStyle(div, null)
const pseudoStyle = window.getComputedStyle(div, '::after')

console.log(style)
console.log(style.width, style.height, style.backgroundColor)
console.log(pseudoStyle)
console.log(pseudoStyle.content)