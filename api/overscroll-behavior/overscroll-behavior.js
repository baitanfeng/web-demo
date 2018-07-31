// generate fake contacts
const main = document.querySelector('.main')

const frag = document.createDocumentFragment()
for (let i = 0; i < 50; i++) {
  const div = document.createElement('div')
  const p = document.createElement('p')
  p.textContent = `contact ${i + 1}`
  div.appendChild(p)
  frag.appendChild(div)
}
main.appendChild(frag)

const form = document.querySelector('form')
const input = document.querySelector('input')
const messages = document.querySelector('.messages')
messages.scrollTop = messages.scrollHeight - messages.clientHeight

form.addEventListener('submit', event => {
  event.preventDefault()
  const value = input.value
  if (!value) {
    return
  }
  const p = document.createElement('p')
  p.classList.add('me')
  p.textContent = value
  messages.appendChild(p)
  messages.scrollTop = messages.scrollHeight - messages.clientHeight

  input.value = ''
  input.focus()
}, false)