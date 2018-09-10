const dropZone = document.querySelector('.drop-zone')
dropZone.addEventListener('dragover', handleDragOver, false)
dropZone.addEventListener('drop', handleFileSelect, false)

function handleDragOver(evt) {
  evt.stopPropagation()
  evt.preventDefault()
  evt.dataTransfer.dropEffect = 'copy'
}

function handleFileSelect(evt) {
  evt.stopPropagation()
  evt.preventDefault()

  const files = evt.dataTransfer.files
  const ul = document.createElement('ul')

  for (let i = 0, len = files.length; i < len; i++) {
    const li = document.createElement('li')
    const file = files[i]
    li.innerHTML = `name: ${file.name}, size: ${file.size}, type: ${file.type}`
    ul.appendChild(li)
  }

  document.querySelector('.output').appendChild(ul)
}