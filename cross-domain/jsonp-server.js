const express = require("express");
const app = express();

app.use(express.static(__dirname));

app.get("/say", function (req, res) {
    const {
        wd,
        callback
    } = req.query;

    console.log(wd);
    console.log(callback);
    res.end(`${callback}("我不爱你")`);
});

app.listen(8888);