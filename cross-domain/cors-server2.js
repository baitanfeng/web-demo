let express = require("express");
let app = express();

app.use(express.static(__dirname));

let whiteList = ["http://127.0.0.1:3000"]
app.use(function(req, res, next) {
  let origin = req.headers.origin;

  if (whiteList.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Headers", "name");
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Max-Age", 6);
    res.setHeader("Access-Control-Expose-Headers", "name");

    if (req.method === "OPTIONS") {
      res.end();
    }
  }

  next();
});

app.put("/getData", function(req, res) {
  console.log(req.headers);
  res.setHeader("name", "jw");
  res.end("我不爱你");
});

app.get("/getData", function(req, res) {
  console.log(req.headers);
  res.end("我不爱你");
});

app.listen(4000);