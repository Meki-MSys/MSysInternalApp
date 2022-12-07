//require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// const passport = require("passport");
// const cookieSession = require("cookie-session");
// const session = require("express-session");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const findOrCreate = require("mongoose-findorcreate");
const connectDB = require("./config/db");
const path = require("path");
// const User = require("./models/user");
// const jwt = require("jsonwebtoken");
// const config = require("config");

//Connect to DB
connectDB();

// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["MsysTech"],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );

// app.use(
//   session({
//     secret: "Our little secret.",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.json({ extend: false }));
//app.use(cors({ origin: "http://localhost:5000/ https://www.googleapis.com/oauth2/v3/userinfo" }));
var whitelist = [
  "http://localhost:5000/",
  "https://www.googleapis.com/oauth2/v3/userinfo",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      corsOptions = { origin: true }
    } else {
      corsOptions = { origin: false }
    }
    callback(null, corsOptions)
  },
};
app.use(cors(corsOptions));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/empdetails", require("./routes/api/empdetails"));
//app.use("/", require("./routes/api/googlelogin"));

// passport.use(User.createStrategy());
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });
// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://localhost:5000/auth/google/callback",
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       const email = profile.emails[0].value;
//       User.findOrCreate(
//         {
//           googleId: profile.id,
//           username: profile.displayName,
//           email: email,
//           provider: profile.provider,
//           isVerified: true,
//         },
//         function (err, user) {
//           return done(err, user);
//         }
//       );
//     }
//   )
// );

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
