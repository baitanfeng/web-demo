let express = require('express');
let cookieParser = require('cookie-parser');
const port = 8081;

let app = express();
app.use(cookieParser('my_cookie_secret'));

app.get('/', (req, res) => {
  if (req.signedCookies.isFirst) {
    res.send('welcome again');
    console.log(req.cookies, req.signedCookies);
  } else {
    res.cookie('isFirst', 1, { maxAge: 60000, signed: true, httpOnly: true });
    res.send('welcome first');
    console.log('welcome first');
  }
});

app.listen(port, () => {
  console.log(`express start on: ${port}`);
});