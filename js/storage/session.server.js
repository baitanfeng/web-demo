let express = require('express');
let session = require('express-session');
let app = express();

app.use(session({
  name: 'sessionid',
  secret: 'my_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000,
    signed: true
  }
}));

app.get('/', (req, res, next) => {
  if (req.session.isFirst) {
    res.send('welcome again');
    console.log(req.session);
  } else {
    req.session.isFirst = 1;
    res.send('welcome first');
    console.log(req.session);
  }
});

app.listen(8082);