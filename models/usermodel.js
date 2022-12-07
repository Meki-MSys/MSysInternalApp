const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  empId: {
    type: Number,
  },
  admin:{
    type:Boolean,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  __v: {
    type: Number,
    select: false,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
