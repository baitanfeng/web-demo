document.querySelector('#files').addEventListener('change', handleFileSelect, false)

function handleFileSelect(evt) {
  const files = evt.target.files

  const ul = document.createElement('ul')
  for (let i = 0, len = files.length; i < len; i++) {
    const file = files[i]
    if (/image/.test(file.type) === false) {
      continue
    }

    const reader = new FileReader()
    reader.onload = (function(file) {
      return function(e) {
        const li = document.createElement('li')
        const img = document.createElement('img')

        li.innerHTML = `name: ${file.name}, size: ${file.size}, type: ${file.type}`
        img.classList = 'thumb'
        img.src = e.target.result
        img.alt = file.name

        li.appendChild(img)
        ul.appendChild(li)
      }
    })(file)
    reader.readAsDataURL(file)
  }

  document.querySelector('.output').appendChild(ul)
}