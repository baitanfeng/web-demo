const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('ok')
})

server.on('upgrade', (req, socket, head) => {
  socket.write(`
    HTTP/1.1 101 WebSocket Protocol Handshake\r\n
    Upgrade: WebSocket\r\n
    Connection: Upgrade\r\n
    \r\n
  `)

  socket.pipe(socket)
})

server.listen(8084, '127.0.0.1', () => {
  const options = {
    port: 8084,
    hostname: '127.0.0.1',
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    }
  }

  const req = http.request(options)
  req.end()

  req.on('upgrade', (res, socket, upgradeHead) => {
    console.log('收到请求')
    socket.end()
    process.exit(0)
  })
})