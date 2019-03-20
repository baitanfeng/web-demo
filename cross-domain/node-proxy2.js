const http = require("http");

const data = {
  title: "frontend",
  password: "123456"
};

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end(JSON.stringify(data));
  }
});

server.listen(4000);