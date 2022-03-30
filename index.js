const express = require("express");

const app = express();
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render('index', {users});
});

app.get('/create', csrfProtection, (req, res, next) => {
  res.render('create', {user: {}, csrfToken: req.csrfToken()})
})

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
