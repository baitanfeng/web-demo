document.querySelector('#files').addEventListener('change', handleFileSelect, false)

function handleFileSelect(evt) {
  const files = evt.target.files

  const ul = document.createElement('ul')
  for (let i = 0, len = files.length; i < len; i++) {
    const li = document.createElement('li')
    const file = files[i]
    li.innerHTML = `name: ${file.name}, size: ${file.size}, type: ${file.type}`
    ul.appendChild(li)
  }

  document.querySelector('.output').appendChild(ul)
}