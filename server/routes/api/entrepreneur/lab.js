const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../../middleware/auth");
const User = require("../../../models/User");
const IntellectualProperty = require("../../../models/entrepreneur/IntellectualProperty");
const ServiceType = require("../../../models/ServiceType");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");

const multer = require("multer");
const IntellectualPropertyTeam = require("../../../models/Entrepreneur/IntellectualPropertyTeam");
const IntellectualPropertyMessage = require("../../../models/Entrepreneur/IntellectualPropertyMessage");
const IntellectualPropertyStages = require("../../../models/Entrepreneur/IntellectualPropertyStages");
const upload = multer({ dest: "public/uploads/lab" });

// @route   GET api/entrepreneur/lab
// @desc    Get IP list for entrepreneur
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const intellectualproperties = await IntellectualProperty.find({
      entrepreneur: req.user.id,
    });
    res.json(intellectualproperties);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// const cpUpload = upload.fields([{ name: "attachments", maxCount: 8 }]);

// @route   POST api/entrepreneur/lab
// @desc    Create Ip
// @access  Public
router.post(
  "/",
  auth,
  upload.array("attachments", 12),
  [
    body("title", "Please fill all required fields").not().isEmpty(),
    body("description", "Please fill all required fields").not().isEmpty()
    // body("budget", "Please fill all required fields").not().isEmpty(),
    // body("deadline", "Please fill all required fields").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // console.log("files", req.file); //for single file

    // console.log("files", req.files);

    const attachments = req.files;

    const entrepreneur = req.user.id;

    const { title, description, budget, deadline, inspirationLinks } = req.body;

    try {
      let intellectualproperty = new IntellectualProperty({
        title,
        description,
        budget,
        deadline,
        inspirationLinks,
        entrepreneur,
        attachments
      });

      await intellectualproperty.save();


      ServiceType.find(async(err,data)=>{
        for (let i in data){
          const ipTeam = new IntellectualPropertyTeam({
            intellectualProperty: intellectualproperty.id,
            serviceType:data[i].id
          });
          await ipTeam.save();
        }

        console.log("ip Id",intellectualproperty.id);

        if(err){
            return res.json({error: err});
        }
        // const intellectualProperty = new IntellectualProperty({title, description, budget, deadline,date,entrepreneurId,team,inspirationLinks});
        // await intellectualProperty.save();
    });

    res.status(200).send("IP added successfully");
    } catch (error) {
      console.error(error.message);
      //   res.status(500).send('Server Error');
      res.status(500).send(error.message);
    }
  }
);

// @route   GET api/entrepreneur/lab/:id
// @desc    Get IP list for entrepreneur
// @access  Private
router.get("/:id", auth, async (req, res) => {
  const id = (req.params.id);
  try {
    const intellectualproperty = await IntellectualProperty.findById(id);
    res.json(intellectualproperty);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});



// @route   POST api/entrepreneur/lab/team
// @desc    Create Ip
// @access  Public
router.post(
  "/team",
  auth,
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }




    const { teamId, freelancers } = req.body;


    //handle not found error

    try {

      IntellectualPropertyTeam.findById(teamId,async(err,data)=>{
       

        if(err){
            return res.json({error: err});
        }

        data.freelancers = freelancers;
        await data.save();
        console.log(data);

    });

    res.status(200).send("Team updated successfully");
    } catch (error) {
      console.error(error.message);
      //   res.status(500).send('Server Error');
      res.status(500).send(error.message);
    }
  }
);

// @route   GET api/entrepreneur/lab/team
// @desc    Get team list for IP
// @access  Private
router.get('/team/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const teams = await IntellectualPropertyTeam.find({
      intellectualProperty: id
    }).
    populate('freelancers').
    populate('serviceType');
    res.json(teams);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/entrepreneur/lab/team
// @desc    Get team detail
// @access  Private
router.get('/team-details/:teamId', auth, async (req, res) => {
  try {
    const id = req.params.teamId;
    const teams = await IntellectualPropertyTeam.findById(id).
    populate('freelancers').
    populate('freelancers.freelancer').
    populate('serviceType');
    res.json(teams);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


// @route   GET api/entrepreneur/lab/staging/:id
// @desc    Get team list for IP
// @access  Private
router.get('/staging/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const stage = await IntellectualPropertyStages.find({
      intellectualProperty: id,
      current: true
    });
    IntellectualPropertyStages.findOne(
      {
      intellectualProperty: id,
      current: true
      })
      .populate(
        {
          path: 'currentStageFreelancer',
          select: '-password'
        }
        )
      .exec(
      async(err,data)=>{
      if(err){
          return res.json({error: err});
      }
    res.json(data);
    });

} catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});



// @route   GET api/entrepreneur/lab/staging/:id
// @desc    Get team list for IP
// @access  Private
router.post('/staging/:id/:prevStageId', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const prevStageId = req.params.prevStageId;

    const { currentStage,currentStageDueDate,currentStageFreelancer,dueDate,totalBudget } = req.body;

    let newStage = new IntellectualPropertyStages({
      intellectualProperty:id,
      currentStage,
      currentStageDueDate,
      totalBudget,
      // currentStageFreelancer:"61a43df240ebd53f355c6ae4",
      dueDate,
      current:true,
    });

    if (prevStageId != "null"){
    const stage = await IntellectualPropertyStages.findById(prevStageId);
    stage.current = false;
    await stage.save();
    }

    await newStage.save();

    res.json(newStage);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});



// @route   POST api/entrepreneur/lab/message
// @desc    POST messages
// @access  Public
router.post(
  "/message",
  auth,
  upload.array("attachments", 12),
  [
    body("message", "Please fill all required fields").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // console.log("files", req.file); //for single file

    // console.log("files", req.files);

    const attachments = req.files;

    // const entrepreneur = req.user.id;

    const { freelancer, type, message, team } = req.body;

    try {
      let intellectualpropertymessage = new IntellectualPropertyMessage({
        freelancer, 
        type, 
        message, 
        team,
        attachments
      });

      await intellectualpropertymessage.save();
      res.status(200).send("Message posted successfully");
    } catch (error) {
      console.error(error.message);
      //   res.status(500).send('Server Error');
      res.status(500).send(error.message);
    }
  }
);

// @route   GET api/entrepreneur/lab/message
// @desc    Get messages for lab
// @access  Private
router.get('/message/team/:teamId/freelancer/:freelancerId', auth, async (req, res) => {
  try {
    const team = (req.params.teamId);
    const freelancer = (req.params.freelancerId);

    const messages = await IntellectualPropertyMessage.find({
      team,freelancer
    });
    res.json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
