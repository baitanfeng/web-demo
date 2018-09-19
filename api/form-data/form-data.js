const form = document.querySelector('form')

form.addEventListener('submit', event => {
  event.preventDefault()

  const formData = new FormData(form)

  const xhr = new XMLHttpRequest()
  xhr.open('POST', form.action)
  xhr.send(formData)
})
