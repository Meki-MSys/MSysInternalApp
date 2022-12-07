const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;

const UserSchemaModel = new Schema({
  email: String,
  username: String,
  googleId: String,
  picture:String,
  provider: String,
  admin:String,
  isVerified: Boolean,
});

UserSchemaModel.plugin(passportLocalMongoose);
UserSchemaModel.plugin(findOrCreate);

module.exports = User = new mongoose.model("User", UserSchemaModel);
