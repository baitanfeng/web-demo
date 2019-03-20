let express = require("express");
let app = express();

app.use(express.static(__dirname));
app.listen(3000);

let websocketServer = require("ws").Server;
let ws = new websocketServer({port: 9000});

ws.on("connection", function(socket) {
  console.log(socket);
  console.log("服务端连接成功");
  socket.on("message", function(message) {
    console.log(`接收到客户端的消息：${message}`);
    socket.send(new Date().toDateString());
  })
})