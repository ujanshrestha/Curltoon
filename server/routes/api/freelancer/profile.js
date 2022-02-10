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
const WorkExperience = require("../../../models/Freelancer/WorkExperience");
const Education = require("../../../models/Freelancer/Education");
const upload = multer({ dest: "public/uploads/freelancer" });




// @route   POST api/freelancer/profile/personal-details
// @desc    Update User Profile
// @access  Restricted
router.post(
  "/personal-details",
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

    const { name,displayName,email,phoneNumber,fullAddress,description } = req.body;

    try {

      user.name = name ;
      user.displayName = displayName;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.fullAddress = fullAddress;
      user.description = description;
      
      // user.active = true;

      await user.save();

      res.json({message:"User updated successfully",user});
      // res.status(200).send("User updated successfully");
    } catch (error) {
      console.error(error.message);
      //   res.status(500).send('Server Error');
      res.status(500).send(error.message);
    }
  }
);


// @route   POST api/freelancer/profile/work-experience
// @desc    Create Ip
// @access  Public
router.post(
  "/work-experience",
  auth,
  [
    body("position", "Please fill all required fields").not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // console.log("files", req.file); //for single file

    // console.log("files", req.files);

    const attachments = req.files;

    const freelancer = req.user.id;

    //category obj
    const { position, startDate, endDate, stillWorking,description } = req.body;

    try {
      let workExperience = new WorkExperience({
        position,
        startDate,
        endDate,
        freelancer,
        description,
        stillWorking
      });

      await workExperience.save();
    res.status(200).send("Work experience added successfully");
    } catch (error) {
      console.error(error.message);
      //   res.status(500).send('Server Error');
      res.status(500).send(error.message);
    }
  }
);

// @route   GET api/freelancer/profile/work-experience
// @desc    Get IP list for entrepreneur
// @access  Private
router.get("/work-experience", auth, async (req, res) => {
  try {
    const experiences = await WorkExperience.find({
      freelancer: req.user.id,
    });
    res.json(experiences);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});



// @route   POST api/freelancer/profile/education
// @desc    Create Ip
// @access  Public
router.post(
  "/education",
  auth,
  [
    body("title", "Please fill all required fields").not().isEmpty(),
    body("college", "Please fill all required fields").not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const freelancer = req.user.id;

    const { title, college, startDate, endDate, stillStudying,description } = req.body;

    try {
      let education = new Education({
        title,
        college,
        startDate,
        endDate,
        freelancer,
        description,
        stillStudying
      });

      await education.save();
    res.status(200).send("Education added successfully");
    } catch (error) {
      console.error(error.message);
      //   res.status(500).send('Server Error');
      res.status(500).send(error.message);
    }
  }
);

// @route   GET api/freelancer/profile/education
// @desc    Get IP list for entrepreneur
// @access  Private
router.get("/education", auth, async (req, res) => {
  try {
    const educations = await Education.find({
      freelancer: req.user.id,
    });
    res.json(educations);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
