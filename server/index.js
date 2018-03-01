var express    = require('express');
var Webtask    = require('webtask-tools');
var bodyParser = require('body-parser');
var randopeep = require("randopeep");
var expressjwt = require("express-jwt");
var jwt = require('jsonwebtoken');
var JWT_SECRET = "patatepoil";
var app = express();

// User database
var users = [{id: 1, username: "joellord", password: "joellord"}];

app.use(bodyParser.json());

// Protected routes should have a valid JWT
var jwtCheck = expressjwt({
    secret: JWT_SECRET
});
app.use('/api/protected', jwtCheck);

app.get("/api/protected/quote", function(req, res) {
    res.status(200).send(randopeep.clickbait.headline("Joel Lord"));
});

app.get("/api/quote", function(req, res) {
    res.status(200).send(randopeep.clickbait.headline());
});

app.post("/login", function(req, res) {
    if (!req.body.username || !req.body.password) return res.status(400).send("Need username and password");

    var user = users.find(function(u) {
        return u.username === req.body.username && u.password === req.body.password;
    });

    if (!user) return res.status(401).send("Invalid username or password");

    var token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, {expiresIn: "15 minutes"});
    res.status(200).send({
        token: token
    });
});

app.get('*', function (req, res) {
    res.sendStatus(404);
});

module.exports = Webtask.fromExpress(app);
