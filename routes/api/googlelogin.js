const passport = require("passport");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000",
  }),
  function (req, res) {
    // Successful authentication, redirect secrets.
    return res.redirect("http://localhost:3000/dashboard");
  }
);
router.get("/userinfo", function (req, res) {
  const username = req.user.username;
  const email = req.user.email;
  const payload = {
    user: {
      id: req.user.id,
    },
  };
  const jwttoken = config.get("jwttoken");

  jwt.sign(payload, jwttoken, { expiresIn: "1800s" }, (err, token) => {
    if (err) throw err;
    return res.json({
      token: token,
      username: username,
      email: email,
    });
  });
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    req.session.destroy(function (err) {
      res.clearCookie('connect.sid');
      return res.redirect("/");
    });
  });
});

module.exports = router;
