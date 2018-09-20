const accept = document.registration.accept
const nextstep = document.querySelector('#nextstep')
const notice = document.querySelector('#notice')

function checkReading() {
  if (checkReading.read) {
    return
  }
  checkReading.read = this.scrollHeight - this.scrollTop === this.clientHeight
  accept.disabled = !checkReading.read
  nextstep.disabled = !checkReading.read
  notice.innerHTML = checkReading.read
    ? 'Thank you.'
    : 'Please, scroll and read the following text.'
}

window.onload = function() {
  const rules = document.querySelector('#rules')
  rules.onscroll = checkReading
  checkReading.call(rules)
}
