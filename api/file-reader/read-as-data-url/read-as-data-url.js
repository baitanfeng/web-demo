const fileEle = document.querySelector('#file')

fileEle.addEventListener('change', event => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.addEventListener('load', e => {
    const img = new Image()
    img.src = e.target.result
    fileEle.insertAdjacentElement('afterend', img)
  })
  reader.readAsDataURL(file)
})