const express    = require('express');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const uuid = require("uuid/v1");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
const PORT = 8080;
const SENDGRID_API = "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";

const users = [
  {id: 1, username: "joellord", password: "joellord", email: "joelphy@gmail.com"},
  {id: 2, username: "guest", password: "guest", email: "guest@example.com"}
];

const magicLinks = {};

app.use(bodyParser.json());
app.use(cors());

app.post("/authorize", (req, res) => {
  if (!req.body.email) return res.status(400).send("Need email");

  const user = users.find(function(u) {
    return u.email === req.body.email;
  });
  if (!user) return res.status(401).send("User not found");

  let magicLink = uuid();
  let callback = req.body.callback;
  if (callback.substr(-1) === "?") callback = callback.substr(0, callback.length-1);
  if (callback.substr(-1) === "/") callback = callback.substr(0, callback.length-1);
  magicLinks[magicLink] = {user, callback};
  console.log(magicLinks);

  setTimeout(()=>{magicLinks[magicLink] = undefined;}, 30000);

  // Email the magic link
  const emailData = {
    from: "Joel Lord <joelphy@gmail.com>",
    to: user.email,
    subject: "Your Magic Link",
    text: `🧙‍♂️ http://localhost:${PORT}/login/${magicLink}`
  };

  sgMail.setApiKey(SENDGRID_API);
  sgMail.send(emailData);

  res.send("Magic Link Sent!").status(200);
});

app.get("/login/:magicLink", (req, res) => {
  const magicLink = magicLinks[req.params.magicLink];

  //Single use, destroy the magicLink
  magicLinks[req.params.magicLink] = undefined;

  if (!magicLink) return res.status(401).send("Nope");

  const token = jwt.sign({
    sub: magicLink.user.id,
    scope: "api:read",
    username: magicLink.user.username,
    email: magicLink.user.email
  }, "mysupersecret", {expiresIn: "10 minutes"});

  const redirectUrl = `${magicLink.callback}/#access_token=${token}`;

  res.redirect(redirectUrl);
});

app.get('*', function (req, res) {
  res.sendStatus(404);
});

app.listen(PORT, () => console.log("Passwordless auth server started on port 8080"));
