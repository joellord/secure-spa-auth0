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
    secret: 'uOPHx6elB7JoT1jbM7iR1W3XEJV9UpYx',
    audience: 'secure-spa-auth0',
    issuer: "https://idontcare.auth0.com/"
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

app.listen(8887, () => console.log("API started on port 8887"));

// module.exports = Webtask.fromExpress(app);
