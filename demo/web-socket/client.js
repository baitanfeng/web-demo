const ws = new WebSocket('ws://localhost:8090/guest')

ws.onmessage = (event) => {
  let data = event.data
  data = JSON.parse(data)
  console.log(`guest at ${data.time}: ${data.guest}`)
}