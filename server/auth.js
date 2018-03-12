var express    = require('express');
var Webtask    = require('webtask-tools');
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
var app = express();

var users = [
    {id: 1, username: "joellord", password: "joellord"},
    {id: 2, username: "guest", password: "guest"}
];

app.use(bodyParser.json());

app.post("/login", function(req, res) {
    if (!req.body.username || !req.body.password) return res.status(400).send("Need username and password");

    var user = users.find(function(u) {
        return u.username === req.body.username && u.password === req.body.password;
    });
    if (!user) return res.status(401).send("User not found");

    var token = jwt.sign({
        id: user.id,
        username: user.username
    }, "mysupersecret", {expiresIn: "10 minutes"});

    res.status(200).send({token: token});
});

app.get('*', function (req, res) {
    res.sendStatus(404);
});

module.exports = Webtask.fromExpress(app);
