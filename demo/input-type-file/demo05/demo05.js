let reader
let progressBar = document.querySelector('.progress-bar')
let progress = document.querySelector('.progress')

document.querySelector('.cancel').addEventListener('click', () => {
  reader.abort()
}, false)

function errorHandler(evt) {
  switch (evt.target.error.code) {
    case evt.target.error.NOT_FOUND_ERR:
      alert('file not found')
      break
    case evt.target.error.NOT_READABLE_ERR:
      alert('file is not readable')
      break
    case evt.target.error.ABORT_ERR:
      break; // noop
    default:
      alert('an error occurred reading this file.')
  }
}

function updateProgress(evt) {
  if (evt.lengthComputable) {
    const percentLoaded = Math.round((evt.loaded / evt.total) * 100)
    if (percentLoaded < 100) {
      progress.style.width = `${percentLoaded}%`
      progress.textContent = `${percentLoaded}%`
    }
  }
}

function handleFileSelect(evt) {
  progress.style.width = `0%`
  progress.textContent = `0%`

  reader = new FileReader()

  reader.onerror = errorHandler
  reader.onprogress = updateProgress
  reader.onabort = function() {
    alert('file read cancelled')
  }
  reader.onloadstart = function() {
    progressBar.classList.add('loading')
  }
  reader.onload = function() {
    // ensure that the progress bar displays 100% at the end
    progress.style.width = `100%`
    progress.textContent = `100%`

    setTimeout(() => {
      progressBar.classList.remove('loading')
    }, 2000);
  }

  reader.readAsBinaryString(evt.target.files[0])
}

document.querySelector('#files').addEventListener('change', handleFileSelect, false)