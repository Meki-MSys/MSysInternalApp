const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmpFormDetails = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  empId: {
    type: Number,
  },
  name: {
    type: String,
    max: 50,
  },
  email: {
    type: String,
    max: 100,
  },
  projectname: {
    type: String,
  },
  year: {
    type: String,
  },
  month: {
    type: String,
  },
  totalexp: {
    type: String,
  },
  skills: {
    type: Array,
  },
  skillexp: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  __v: {
    type: Number,
    select: false,
  },
});

module.exports = EmpDetails = mongoose.model("empformdetails", EmpFormDetails);
