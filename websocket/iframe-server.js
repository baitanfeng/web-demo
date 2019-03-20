let express = require("express");
let app = express();

app.use(express.static(__dirname));
app.get("/clock", function(req, res) {
  setInterval(() => {
    let date = new Date().toLocaleString();
    res.write(`
      <script>
        parent.document.querySelector("div").innerHTML = "${date}";
      </script>
    `)
  }, 1000);
});

app.listen(9999);