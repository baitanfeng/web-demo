const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "Content-Type"
  });

  const proxyReq = http.request({
    host: "127.0.0.1",
    port: 4000,
    url: "/",
    method: req.method,
    headers: req.headers
  }, serverRes => {
    let body = "";
    serverRes.on("data", chunk => {
      body += chunk;
    });
    serverRes.on("end", () => {
      console.log(`the data is ${body}`);
      res.end(body);
    });
  }).end();
});

server.listen(3000);