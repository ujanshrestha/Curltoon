const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../../../middleware/auth");
const AgeGroup = require("../../../models/AgeGroup");
const ArtStyle = require("../../../models/ArtStyle");
const PipelineSteps = require("../../../models/Entrepreneur/PipelineSteps");
const PipelineTypes = require("../../../models/Entrepreneur/PipelineTypes");
const Genre = require("../../../models/Genre");
const ServiceType = require("../../../models/ServiceType");
const User = require("../../../models/User");

// const upload = multer({ dest: "public/uploads/lab" });

// @route   GET api/admin/entrepreneur
// @desc    Get IP list for entrepreneur
// @access  Private
router.get("/entrepreneur", auth, async (req, res) => {
  try {
    const entrepreneurs = await User.find({
      role: 'entrepreneur',
    }).select("-password");
    res.json(entrepreneurs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/admin/ip-pipelines
// @desc    Get IP list for entrepreneur
// @access  Private
router.get("/ip-pipelines", auth, async (req, res) => {
    try {
      const ipPipelines = await ServiceType.find();
      res.json(ipPipelines);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });


// @route   POST api/admin/ip-pipelines
// @desc    Get IP list for entrepreneur
// @access  Private
router.post("/ip-pipelines", auth, 
[
  body("title", "Please fill all required fields").not().isEmpty()
],
async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, title,description } = req.body;

  let responseMsg = "";

  try {
    if (id){
      const serviceType = await ServiceType.findById(id);
      serviceType.title = title;
      serviceType.description = description;
      responseMsg="IP Pipeline Updated Successfully";
      await serviceType.save();
    }
    else{
      const serviceType = new ServiceType({
        title,description
      });
      responseMsg="IP Pipeline Created Successfully";
      await serviceType.save();
    }
   
  res.status(200).send(responseMsg);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// @route   GET api/admin/pipeline-types
// @desc    Get IP list for entrepreneur
// @access  Private
router.get("/pipeline-types", auth, async (req, res) => {
    try {
      const pipelineTypes = await PipelineTypes.find();
      res.json(pipelineTypes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
});


// @route   POST api/admin/pipeline-types
// @desc    Get IP list for entrepreneur
// @access  Private
router.post("/pipeline-types", auth, 
[
  body("name", "Please fill all required fields").not().isEmpty()
],
async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const { id, name,description } = req.body;

  // console.log("description",description);

  let responseMsg = "";

  try {
    if (id){
      const pipelineType = await PipelineTypes.findById(id);
      pipelineType.name = name;
      pipelineType.description = description;
      responseMsg="Pipeline Updated Successfully";
      await pipelineType.save();
    }
    else{
      const pipelineType = new PipelineTypes({
        name,description
      });
      responseMsg="Pipeline Created Successfully";
      await pipelineType.save();
    }
   

  res.status(200).send(responseMsg);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// @route   GET api/admin/pipeline-steps
// @desc    Get IP list for entrepreneur
// @access  Private
router.get("/pipeline-steps/:pId", auth, async (req, res) => {
  try {
    const pipelineTypeId = (req.params.pId);

    const pipelineSteps = await PipelineSteps.find({
      pipelineType:pipelineTypeId
    });

    const pipelineType = await PipelineTypes.findById(pipelineTypeId);

    res.json({pipelineSteps,pipelineType});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


// @route   POST api/admin/pipeline-steps
// @desc    Create Ip
// @access  Public
router.post(
  "/pipeline-steps",
  auth,
  [
    body("name", "Please fill all required fields").not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name , description, pipelineType,currentId } = req.body;
    let responseMsg = "";

    try {
      if (currentId){
        const pipelineStep = await PipelineSteps.findById(currentId);
        pipelineStep.name = name;
        pipelineStep.description = description;
        responseMsg="Pipeline step Updated Successfully";
        await pipelineStep.save();
      }
      else{
      let pipelineStep = new PipelineSteps({
        name,
        description,
        pipelineType
      });
      responseMsg="Pipeline Step Created Successfully";
      await pipelineStep.save();
      }
      res.status(200).send("Pipeline Step added successfully");
    } catch (error) {
      console.error(error.message);
      //   res.status(500).send('Server Error');
      res.status(500).send(error.message);
    }
  }
);

// @route   GET api/admin/genre
// @desc    Get IP list for entrepreneur
// @access  Private
router.get("/genre", auth, async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


// @route   POST api/admin/genre
// @desc    Get IP list for entrepreneur
// @access  Private
router.post("/genre", auth, 
[
body("title", "Please fill all required fields").not().isEmpty()
],
async (req, res) => {

const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

const { id, title,description } = req.body;

let responseMsg = "";

try {
  if (id){
    const genre = await Genre.findById(id);
    genre.title = title;
    genre.description = description;
    responseMsg="Genre Updated Successfully";
    await genre.save();
  }
  else{
    const genre = new Genre({
      title,description
    });
    responseMsg="Genre Created Successfully";
    await genre.save();
  }
 
res.status(200).send(responseMsg);
} catch (error) {
  console.error(error.message);
  res.status(500).send(error.message);
}
});

// @route   GET api/admin/art-style
// @desc    Get IP list for entrepreneur
// @access  Private
router.get("/art-style", auth, async (req, res) => {
  try {
    const artSyle = await ArtStyle.find();
    res.json(artSyle);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


// @route   POST api/admin/art-style
// @desc    Get IP list for entrepreneur
// @access  Private
router.post("/art-style", auth, 
[
body("title", "Please fill all required fields").not().isEmpty()
],
async (req, res) => {

const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

const { id, title,description } = req.body;

let responseMsg = "";

try {
  if (id){
    const artStyle = await ArtStyle.findById(id);
    artStyle.title = title;
    artStyle.description = description;
    responseMsg="Style Updated Successfully";
    await artStyle.save();
  }
  else{
    const artStyle = new ArtStyle({
      title,description
    });
    responseMsg="Style Created Successfully";
    await artStyle.save();
  }
 
res.status(200).send(responseMsg);
} catch (error) {
  console.error(error.message);
  res.status(500).send(error.message);
}
});

// @route   GET api/admin/age-group
// @desc    Get IP list for entrepreneur
// @access  Private
router.get("/age-group", auth, async (req, res) => {
  try {
    const ageGroup = await AgeGroup.find();
    res.json(ageGroup);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


// @route   POST api/admin/age-group
// @desc    Get IP list for entrepreneur
// @access  Private
router.post("/age-group", auth, 
[
body("title", "Please fill all required fields").not().isEmpty()
],
async (req, res) => {

const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

const { id, title,description } = req.body;

let responseMsg = "";

try {
  if (id){
    const ageGroup = await AgeGroup.findById(id);
    ageGroup.title = title;
    ageGroup.description = description;
    responseMsg="Age Group Updated Successfully";
    await ageGroup.save();
  }
  else{
    const ageGroup = new AgeGroup({
      title,description
    });
    responseMsg="Age Group Created Successfully";
    await ageGroup.save();
  }
 
res.status(200).send(responseMsg);
} catch (error) {
  console.error(error.message);
  res.status(500).send(error.message);
}
});



module.exports = router;
