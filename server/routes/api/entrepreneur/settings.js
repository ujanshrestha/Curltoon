const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");
const Company = require("../../../models/Entrepreneur/Company");
const { response } = require("express");
const e = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/entrepreneur" });




// @route   POST api/entrepreneur/settings/user-profile
// @desc    Update User Profile
// @access  Restricted
router.post(
  "/user-profile",
  auth,
  upload.single("image"),
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id);
    console.log("files", req.file);
    if (req.file) {
      const image = req.file.filename;
      user.image = image;
    }
    // res.send(JSON.stringify(user));

    const { name,displayName,email,phoneNumber } = req.body;

    try {

      user.name = name ;
      user.displayName = displayName;
      user.email = email;
      user.phoneNumber = phoneNumber;
      // user.active = true;

      await user.save();
      res.status(200).send("User updated successfully");
    } catch (error) {
      console.error(error.message);
      //   res.status(500).send('Server Error');
      res.status(500).send(error.message);
    }
  }
);



// @route   POST api/settings/company-profile
// @desc    Update Company Profile
// @access  Restricted
router.post(
  "/company-profile",
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name,address,contactNumber,email,description } = req.body;

    const entrepreneur= req.user.id;

    try {
      const company = await Company.findOne({entrepreneur},async(err,data) => {
          if (err) {
            res.status(500).send(error.message);
          }
          if (data) {
            data.name = name ;
            data.address = address;
            data.email = email;
            data.contactNumber = contactNumber;
            await data.save();
          }
          else {
            let companyUpdated = new Company({
              name,
              address,
              contactNumber,
              email,
              description,
              entrepreneur
            });
            await companyUpdated.save();
          }
      });
      res.status(200).send("Company profile updated successfully");
    } catch (error) {
      console.error(error.message);
      //   res.status(500).send('Server Error');
      res.status(500).send(error.message);
    }
  }
);

// @route   GET api/entrepreneur/settings/user-profile
// @desc    Fetch User Profile
// @access  Restricted
router.get(
  "/company-profile",
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const entrepreneur= req.user.id;
    try {
      const company = await Company.findOne({entrepreneur});
      res.status(200).send(company);
    } catch (error) {
      console.error(error.message);
      //   res.status(500).send('Server Error');
      res.status(500).send(error.message);
    }
  }
);




module.exports = router;
