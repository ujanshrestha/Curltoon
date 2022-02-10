const express = require("express");
const Technology = require("../../models/technologySchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");
//file upload
const multer = require('multer');
const path = require('path');
// router.options('*', cors())
router.use(express.static(__dirname + "./public/"));

const Storage = multer.diskStorage({
    destination: "./public/uploadcontact/",
    filename: (req, file, cd) => {
        cd:(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));

    }
});
const upload = multer({
    storage: Storage
}).single('image');


//...../file upload

// @route   GET api/auth
// @desc    Get current user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/",
  [
    body("email", "Please include the valid is email").isEmail(),
    body("password", "Please is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true,
          });

          res.json({ message: "Logged in Successfully" });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/logout", (req, res) => {
  console.log("logout page");
  res.clearCookie('jwtoken', {path: '/'});
  res.status(200).send("User Logout");
});

//============================ admin technology entry form (admin)

router.post('/technology', upload, async (req, res) => {
  const {name, description, featured_image, status} = req.body;
  // return res.status(422).json(req.body);
  if (!name || !description) {
      return res.status(422).json({error: "Fill all Fields"});
  }
  try {
      const technology = new Technology({name, description, featured_image, status});
      await technology.save();
      return res.status(201).json({message: "Technology entery Success."});
  } catch (e) {
      console.log(e);
  }
});

router.get("/getAlltechnology", async (req, res) => {
  try {
      const data = await Technology.find();
      res.header('Access-Control-Allow-Origin', '*');
      res.status(200).json(data);
  } catch (e) {
      res.status(400).send(e);
      console.log(e);
  }
})

/*---------.-------------------/get all course Technology display---------*/
//Delete Individual Technology
router.delete("/delgetAlltechnology/:id", async (req, res) => {
  try {
      const data = await Technology.findByIdAndDelete(req.params.id);
      res.status(200).send(data);
  } catch (e) {
      res.status(400).send(e);
      console.log(e);
  }
})


module.exports = router;
