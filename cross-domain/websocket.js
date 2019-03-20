let express = require("express");
let app = express();
app.use(express.static(__dirname));
app.listen(3000);

let ws = require("ws");
let socket = new ws.Server({port: 4000});

socket.on("connection", function(s) {
  s.on("message", function(data) {
    console.log(data);
    s.send("我不爱你");
  });
});
