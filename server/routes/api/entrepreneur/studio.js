const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const Project = require('../../../models/entrepreneur/Project');
const { body, validationResult } = require('express-validator');

const multer = require('multer');
const ProjectPipeLines = require('../../../models/Entrepreneur/ProjectPipeLine');
const ProjectMessage = require('../../../models/Entrepreneur/ProjectMessage');
const ProjectPipeLine = require('../../../models/Entrepreneur/ProjectPipeLine');
const PipelineTypes = require('../../../models/Entrepreneur/PipelineTypes');
const PipelineSteps = require('../../../models/Entrepreneur/PipelineSteps');

const upload = multer({ dest: 'public/uploads/lab' });

// @route   GET api/entrepreneur/project
// @desc    Get project list for entrepreneur
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      entrepreneur: req.user.id,
    });
    res.json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/entrepreneur/project
// @desc    Create Project
// @access  Public
router.post(
  '/',
  auth,
  //   upload.array('attachments', 12),
  [
    body('intellectualProperty', 'Please fill all fields').not().isEmpty(),
    body('description', 'Please fill all fields').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const entrepreneur = req.user.id;

    const {
      description,
      intellectualProperty,
      inspirationLinks,
      pipeline
    } = req.body;

    try {
      let project = new Project({
        description,
        intellectualProperty,
        entrepreneur,
        inspirationLinks,
        pipeline
      });

      await project.save();

      PipelineSteps.find({pipelineType:pipeline},async(err,data)=>{
        for (let i in data){
          const projectPipeline = new ProjectPipeLine({
            project: project.id,
            pipelineStep:data[i]._id
          });
          console.log("pipeline",projectPipeline);
          await projectPipeline.save();
        }

        if(err){
            return res.json({error: err});
        }
        // const intellectualProperty = new IntellectualProperty({title, description, budget, deadline,date,entrepreneurId,team,inspirationLinks});
        // await intellectualProperty.save();
    });


      res.status(200).send('Project added successfully');
    } catch (error) {
      console.error(error.message);
      //   res.status(500).send('Server Error');
      res.status(500).send(error.message);
    }
  }
);

// @route   GET api/entrepreneur/project/:id
// @desc    Get project list for entrepreneur
// @access  Private
router.get("/:id", auth, async (req, res) => {
  const id = (req.params.id);
  try {
    const project = await Project.findById(id);
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/entrepreneur/project/message
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

    const { freelancer, type, message, pipeline } = req.body;

    try {
      let projectMessage = new ProjectMessage({
        freelancer, 
        type, 
        message, 
        pipeline,
        attachments
      });

      await projectMessage.save();
      res.status(200).send("Message posted successfully");
    } catch (error) {
      console.error(error.message);
      //   res.status(500).send('Server Error');
      res.status(500).send(error.message);
    }
  }
);

// @route   GET api/entrepreneur/project/message
// @desc    Get project list for entrepreneur
// @access  Private
router.get('/message/pipeline/:pipelineId/freelancer/:freelancerId', auth, async (req, res) => {
  try {
    const pipeline = (req.params.pipelineId);
    const freelancer = (req.params.freelancerId);

    const messages = await ProjectMessage.find({
      pipeline,freelancer
    });
    res.json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


// @route   POST api/entrepreneur/project/pipeline
// @desc    Create Ip
// @access  Public
router.post(
  "/pipeline",
  auth,
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }




    const { pipelineId, members } = req.body;


    //handle not found error

    try {

      ProjectPipeLine.findById(pipelineId,async(err,data)=>{
       

        if(err){
            return res.json({error: err});
        }

        data.members = members;
        await data.save();
        console.log(data);

    });

    res.status(200).send("Pipeline Team updated successfully");
    } catch (error) {
      console.error(error.message);
      //   res.status(500).send('Server Error');
      res.status(500).send(error.message);
    }
  }
);

// @route   GET api/entrepreneur/project/pipeline
// @desc    Get team list for Project
// @access  Private
router.get('/:id/pipeline-list', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const projectPipelines = await ProjectPipeLine.find({project:id}).
    populate('pipelineStep');

    const project = await Project.findById(id);
    // populate('members').
    // populate('project');
    const response = {
      project: project,
      projectPipelines: projectPipelines
    }
    // res.json(response);
    res.json(projectPipelines);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/entrepreneur/project/pipeline
// @desc    Get team list for Project
// @access  Private
router.get('/pipeline/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const pipeline = await ProjectPipeLine.findById(id);
    // populate('members').
    // populate('project');
    res.json(pipeline);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


// @route   GET api/entrepreneur/project/pipelines-types/list
// @desc    Get pipeline types list
// @access  Private
router.get("/pipelines-types/list", auth, async (req, res) => {
  try {
    const pipelines = await PipelineTypes.find();
    res.json(pipelines);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
