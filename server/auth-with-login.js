var express = require('express');
// var Webtask = require('webtask-tools');
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
var app = express();

var users = [
  {id: 1, username: "joellord", password: "joellord"},
  {id: 2, username: "guest", password: "guest"}
];

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/login", function(req, res) {
  var loginForm = "<form method='post'><input type=hidden name=callback value='" + req.query.callback + "'><input type=text name=username /><input type=text name=password /><input type=submit></form>";
  res.status(200).send(loginForm);
});

app.post("/login", function(req, res) {
  if (!req.body.username || !req.body.password) return res.status(400).send("Need username and password<br/><img src='https://http.cat/400' width='300px'/>");

  var user = users.find(function(u) {
    return u.username === req.body.username && u.password === req.body.password;
  });
  if (!user) return res.status(401).send("User not found<br/><img src='https://http.cat/401' width='300px'/>");

  var token = jwt.sign({
    sub: user.id,
    scope: "api:read",
    username: user.username
  }, "mysupersecret", {expiresIn: "10 minutes"});

  res.redirect(req.body.callback + "#access_token=" + token);
});

app.get('*', function (req, res) {
  res.sendStatus(404);
});

app.listen(8080, () => console.log("Auth server started on port 8080"));
// module.exports = Webtask.fromExpress(app);
