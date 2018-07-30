const fileEle = document.querySelector('#file')

fileEle.addEventListener('change', event => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.addEventListener('load', e => {
    fileEle.insertAdjacentText('afterend', `${e.target.result}`)
  })
  reader.readAsText(file)
})