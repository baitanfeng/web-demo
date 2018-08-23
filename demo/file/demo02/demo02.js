function handleFileSelect(evt) {
  evt.stopPropagation()
  evt.preventDefault()

  const files = evt.dataTransfer.files
  const ul = document.createElement('ul')

  for (let i = 0; i < files.length; i++) {
    const li = document.createElement('li')
    const file = files[i]
    li.innerHTML = `name: ${file.name}, size: ${file.size}, type: ${file.type}`
    ul.appendChild(li)
  }

  document.querySelector('.output').appendChild(ul)
}

function handleDragOver(evt) {
  evt.stopPropagation()
  evt.preventDefault()
  evt.dataTransfer.dropEffect = 'copy'
}

const dropZone = document.querySelector('.drop-zone')
dropZone.addEventListener('dragover', handleDragOver, false)
dropZone.addEventListener('drop', handleFileSelect, false)