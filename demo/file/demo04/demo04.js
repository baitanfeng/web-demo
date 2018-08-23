const output = document.querySelector('.output')

function readBlob(start, end) {
  const files = document.querySelector('#files').files

  if (!files.length) {
    alert('please select a file!')
    return
  }

  const file = files[0]
  start = Number.parseInt(start) || 0
  end = Number.parseInt(end) || file.size - 1

  const reader = new FileReader()
  reader.onloadend = function(evt) {
    if (evt.target.readyState === FileReader.DONE) {
      output.innerHTML = evt.target.result
    }
  }
  const blob = file.slice(start, end + 1)
  reader.readAsBinaryString(blob)
}

document.querySelector('.read-byte-btn-wrap').addEventListener('click', function(evt) {
  const target = evt.target
  if (target.tagName.toLowerCase() === 'button') {
    const start = target.getAttribute('data-startbyte')
    const end = target.getAttribute('data-endbyte')
    readBlob(start, end)
  }
}, false)