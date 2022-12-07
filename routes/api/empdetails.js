const express = require("express");
const router = express.Router();
const EmpDetailModel = require("../../models/empformmodel");
const auth = require("../../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const {
      empId,
      name,
      email,
      projectname,
      year,
      month,
      totalexp,
      skills,
      skillexp,
    } = req.body;
    let empdetails = {};
    empdetails.user = req.user.id;
    empdetails.empId = empId;
    empdetails.name = name;
    empdetails.email = email;
    empdetails.projectname = projectname;
    empdetails.year = year;
    empdetails.month = month;
    empdetails.totalexp = totalexp;
    empdetails.skills = skills;
    empdetails.skillexp = skillexp;
    let empdata = await EmpDetailModel.findOne({ user: req.user.id });
    if (empdata) {
      empdata = await EmpDetailModel.findOneAndUpdate(
        { user: req.user.id },
        { $set: empdetails },
        { new: true }
      );
      return res.json(empdata);
    }
    empdata = new EmpDetailModel(empdetails);
    await empdata.save();
    return res.json(empdata);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error");
  }
});

router.get("/all", async (req, res) => {
  try {
    const getempdetails = await EmpDetailModel.find().select("-id");
    return res.json(getempdetails);
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

router.get("/count", async (req, res) => {
  try {
    const getempdetails = await EmpDetailModel.count();
    return res.json(getempdetails);
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

router.get("/skillcount", async (req, res) => {
  try {
    const Rcount = await EmpDetailModel.find({ skills: "react" }).count();
    const Acount = await EmpDetailModel.find({ skills: "angular" }).count();
    const Gocount = await EmpDetailModel.find({ skills: "go" }).count();
    const Pcount = await EmpDetailModel.find({ skills: "python" }).count();
    const Jcount = await EmpDetailModel.find({ skills: "javascript" }).count();
    const skillobject = {
      React: Rcount,
      Angular: Acount,
      Go: Gocount,
      Python: Pcount,
      JavaScript: Jcount,
    };
    return res.json(skillobject);
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

router.get("/:email", async (req, res) => {
  try {
    const getempdetails = await EmpDetailModel.findOne({
      email: req.params.email,
    }).select("-user -date");
    if (!getempdetails) {
      return res.json({ msg: "Employee Details not found" });
    }
    return res.json(getempdetails);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Profile not found" });
    }
    return res.status(500).send("Server error");
  }
});

module.exports = router;
