const express = require("express");
const app = express();

app.use(express.static(__dirname));

app.use(function (req, res, next) {
    const { origin } = req.headers;

    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Headers", "name");
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Max-Age", 6);
    res.setHeader("Access-Control-Expose-Headers", "name");

    if (req.method === "OPTIONS") {
        res.end();
    }

    next();
});

app.put("/getData", function (req, res) {
    res.setHeader("name", "jw");
    res.end("我不爱你");
});

app.listen(4000);