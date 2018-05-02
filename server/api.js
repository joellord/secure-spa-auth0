var express    = require('express');
// var Webtask    = require('webtask-tools');
var randopeep = require("randopeep");
var expressjwt = require("express-jwt");
var cors = require("cors");
var app = express();

const useAuth0 = true;

let jwtCheckOptions = {};

if (useAuth0) {
  jwtCheckOptions = {
    secret: 't2ABNgm7aB8YrMrnsutSB0bPNtLZbC7P',
    audience: 'secure-spa-auth0',
    issuer: "https://joel-1.auth0.com/"
  };
} else {
  jwtCheckOptions = {
    secret: "mysupersecret"
  };
}

var jwtCheck = expressjwt(jwtCheckOptions);

app.use(cors());

app.get("/headline", function(req, res) {
    res.status(200).send(randopeep.clickbait.headline());
});

app.get("/protected/headline", jwtCheck, function(req, res) {
    res.status(200).send(randopeep.clickbait.headline("Joel Lord"));
});

app.get('*', function (req, res) {
    res.sendStatus(404);
});

app.listen(8888, () => console.log("API started on port 8888"));

// module.exports = Webtask.fromExpress(app);
