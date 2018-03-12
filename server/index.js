var express    = require('express');
var Webtask    = require('webtask-tools');
var bodyParser = require('body-parser');
var randopeep = require("randopeep");
var expressjwt = require("express-jwt");
var jwt = require('jsonwebtoken');
var JWT_SECRET = "patatepoil";
var app = express();

// User database
var users = [{id: 1, username: "joellord", password: "joellord", scope: "awesome"},
    {id: 2, username: "guest", password: "guest", scope: ""}];

app.use(bodyParser.json());

// Protected routes should have a valid JWT
var jwtCheck = expressjwt({
    secret: JWT_SECRET
});
app.use('/api/protected', jwtCheck);

app.get("/api/protected/quote", function(req, res) {
    console.log(req.user);
    if (req.user && req.user.scope && req.user.scope.indexOf("awesome") > -1) {
        res.status(200).send(randopeep.clickbait.headline("Joel Lord"));
    } else {
        res.status(403).send("You are logged in but not authorized to view awesome headlines");
    }

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

    var userData = {id: user.id, username: user.username, scope: user.scope};

    var token = jwt.sign(userData, JWT_SECRET, {expiresIn: "15 minutes"});
    res.status(200).send({
        token: token
    });
});

app.get('*', function (req, res) {
    res.sendStatus(404);
});

module.exports = Webtask.fromExpress(app);
