const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../../middleware/auth");
const User = require("../../../models/User");
const IntellectualProperty = require("../../../models/entrepreneur/IntellectualProperty");
const { body, validationResult } = require("express-validator");

const multer = require("multer");
const IntellectualPropertyTeam = require("../../../models/Entrepreneur/IntellectualPropertyTeam");
const IntellectualPropertyMessage = require("../../../models/Entrepreneur/IntellectualPropertyMessage");
const IntellectualPropertyStages = require("../../../models/Entrepreneur/IntellectualPropertyStages");
const EntrepreneurTeam = require("../../../models/Entrepreneur/EntrepreneurTeam");
const EntrepreneurSubTeam = require("../../../models/Entrepreneur/EntrepreneurSubTeam");

// const upload = multer({ dest: "public/uploads/lab" });

// @route   GET api/entrepreneur/team
// @desc    Get IP list for entrepreneur
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const teams = await EntrepreneurTeam.find({
      entrepreneur: req.user.id,
    });
    res.json(teams);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


// const cpUpload = upload.fields([{ name: "attachments", maxCount: 8 }]);

// @route   POST api/entrepreneur/team
// @desc    Create Ip
// @access  Public
router.post(
    "/",
    auth,
    // upload.array("attachments", 12),
    [
      body("title", "Please fill all required fields").not().isEmpty()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // console.log("files", req.file); //for single file
  
      // console.log("files", req.files);
  
      const entrepreneur = req.user.id;
  
      const { title , description } = req.body;
  
      try {
        let entrepreneurTeam = new EntrepreneurTeam({
          title,
          description,
          entrepreneur
        });
  
        await entrepreneurTeam.save();

  
        res.status(200).send("Team added successfully");
      } catch (error) {
        console.error(error.message);
        //   res.status(500).send('Server Error');
        res.status(500).send(error.message);
      }
    }
  );



// @route   GET api/entrepreneur/team/:teamId
// @desc    Get IP list for entrepreneur
// @access  Private
router.get("/:teamId", auth, async (req, res) => {
const teamId  = req.params.teamId;
try {
    const teams = await EntrepreneurSubTeam.find({
        // entrepreneur: req.user.id,
        entrepreneurteam: teamId
    });
    res.json(teams);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
}
});


// @route   POST api/entrepreneur/team
// @desc    Create Ip
// @access  Public
router.post(
    "/subteam",
    auth,
    // upload.array("attachments", 12),
    [
      body("title", "Please fill all required fields").not().isEmpty()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // console.log("files", req.file); //for single file
  
      // console.log("files", req.files);

      const entrepreneur = req.user.id;
  
      const { title , description, entrepreneurteam } = req.body;
  
      try {
        let entrepreneurSubTeam = new EntrepreneurSubTeam({
          title,
          description,
          entrepreneur,
          entrepreneurteam
        });
  
        await entrepreneurSubTeam.save();

  
        res.status(200).send("Team added successfully");
      } catch (error) {
        console.error(error.message);
        //   res.status(500).send('Server Error');
        res.status(500).send(error.message);
      }
    }
  );


module.exports = router;
