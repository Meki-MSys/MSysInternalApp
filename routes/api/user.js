const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/user");

//Get user data
router.get("/getuser", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-_id -date");
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }
    return res.json(user);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [body("email", "Please includes email address").isEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, empId, admin } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        const payload = {
          user: {
            id: user.id,
          },
        };
        const jwttoken = config.get("jwttoken");

        jwt.sign(payload, jwttoken, { expiresIn: "1800s" }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
        return false;
        //res.status(400).json({ error: [{ msg: "User Already Exists" }] });
      }
      user = new User({
        email,
        empId,
        name,
        admin,
      });
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      const jwttoken = config.get("jwttoken");

      jwt.sign(payload, jwttoken, { expiresIn: "1800s" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post("/saveuserdetails", async (req, res) => {
  try {
    const { sub, email, admin, email_verified, picture, name } =
      req.body;
    let user = await User.findOne({ email });
    if (user) {
      const payload = {
        user: {
          id: user.id,
        },
      };
      const jwttoken = config.get("jwttoken");

      jwt.sign(payload, jwttoken, { expiresIn: "1800s" }, (err, token) => {
        if (err) throw err;
        res.json({ token: token, username: user.username, email: user.email });
      });
      return false;
    }
    user = new User({
      email: email,
      username: name,
      isVerified: email_verified,
      googleId: sub,
      picture: picture,
      provider: "google",
      admin: admin
    });
    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };
    const jwttoken = config.get("jwttoken");

    jwt.sign(payload, jwttoken, { expiresIn: "1800s" }, (err, token) => {
      if (err) throw err;
      res.json({ token: token, username: username, email: email });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
