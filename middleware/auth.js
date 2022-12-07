const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  const gettoken = config.get("jwttoken");
  if (!token) {
    return res.status(401).json({ msg: "No token, Authorizated deined" });
  }
  try {
    const decode = jwt.verify(token, gettoken);
    req.user = decode.user;
    next();
  } catch (e) {
    return res.status(401).json({ msg: "Token is not vaild" });
  }
};
