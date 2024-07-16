const express = require("express");
const User = require('../models/User');
const router = express.Router();
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Sujitisagoodb$oy";
 
// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required.
router.post("/createuser",[
      body('name', 'Enter a valid name').isLength({min: 3}),
      body('email', 'Enter a valid email').isEmail(),
      body('password', 'Password must be atleast 5 characters').isLength({min: 5}),
], async (req, res) => {
  let success = false;
    // If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    // check wheather the user with this email exist already
    try {
      let user = await User.findOne({email: req.body.email});
      if(user) {
        return res.status(400).json({success, error: "Sorry a user with the same email is already exist"})
      }
      
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
      });

      const data = {
        user: {
          id: user.id
        }
      }
      
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken});

    // catch errors
    } catch (error) {
      console.error(error.message);
      // If error occured, the status code will 500
      res.status(500).send("Internal server errors!");
    }
    
})

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required.
router.post("/login",[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({success, error: "Please try to login with correct Credentials"})
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
      success = false;
      return res.status(400).json({ success, error: "Please try to login with correct Credentials"})
    }

    const data = {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken});

  } catch (error) {
    console.error(error.message);
    // If error occured, the status code will 500
    res.status(500).send("Internal server errors!");
  }
});

// ROUTE 3: Get loggedin User details using: POST "/api/auth/getuser". Login required.
router.post("/getuser", fetchuser, async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    // If error occured, the status code will 500
    res.status(500).send("Internal server errors!");
  }
});
module.exports = router;