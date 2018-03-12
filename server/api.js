var express    = require('express');
var Webtask    = require('webtask-tools');
var bodyParser = require('body-parser');
var randopeep = require("randopeep");
var expressjwt = require("express-jwt");
var app = express();

var jwtCheck = expressjwt({
    secret: "mysupersecret"
});

app.use(bodyParser.json());

app.get("/headline", function(req, res) {
    res.status(200).send(randopeep.clickbait.headline());
});

app.get("/protected/headline", jwtCheck, function(req, res) {
    res.status(200).send(randopeep.clickbait.headline("Joel Lord"));
});

app.get('*', function (req, res) {
    res.sendStatus(404);
});

module.exports = Webtask.fromExpress(app);
