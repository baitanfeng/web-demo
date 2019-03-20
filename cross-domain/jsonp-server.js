let express = require("express");
let app = express();

app.use(express.static(__dirname));
app.get("/say", function(req, res) {
  let { wd, callback } = req.query;
  console.log(wd);
  console.log(callback);
  res.end(`${callback}("我不爱你")`);
});

app.listen(8888);