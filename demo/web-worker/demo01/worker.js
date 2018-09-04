count = 0

onmessage = e => {
  console.log(e.data)
  postMessage('post message from worker')
  setInterval(() => {
    postMessage(count++)
  }, 1000)
}