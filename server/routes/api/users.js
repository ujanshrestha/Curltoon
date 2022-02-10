const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please include valid email").isEmail(),
    body("phoneNumber", "Phone Number is required").not().isEmpty(),
    body(
      "password",
      "Please enter a password with 6 or more character"
    ).isLength({ min: 6 }),
    body('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, phoneNumber } = req.body;

    const active = true; //set false and only true after verification

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // const avatar = gravatar.url(email, {
      //   s: '200',
      //   r: 'pg',
      //   d: 'mm',
      // });

      user = new User({
        name,
        email,
        // avatar,
        password,
        role,
        phoneNumber,
        active
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
          // res.json({ token });
          res.status(200).send("Signed up successfully");
        }
      );
    } catch (error) {
      console.error(error.message);
      // res.status(500).send('Server error');
      res.status(500).send(error.message);
    }
  }
);

// @route   POST api/users/settings/change-password
// @desc    Change Password
// @access  Restricted
router.post(
  "/settings/change-password",
  auth,
  [
    body("oldPassword", "Please fill all fields").exists(),
    body("newPassword", "Please fill all fields").exists(),
    body('confirmNewPassword').custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { oldPassword,newPassword,confirmNewPassword } = req.body;

    try {
      let user = await User.findById(req.user.id);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Doesn't exist" }] });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Wrong password" }] });
      }

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
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

          res.status(200).send("Password updated successfully");

        }
      );



    }  catch (error) {
      console.error(error.message);
      //   res.status(500).send('Server Error');
      res.status(500).send(error.message);
    }
  });

module.exports = router;
