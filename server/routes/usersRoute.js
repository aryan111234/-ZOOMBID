const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");


// New user registeration
router.post("/register", async (req, res) => {
  try {
    // Checking if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("User already exists");
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //Saving User
    const newUser = new User(req.body);
    await newUser.save();
    req.send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      message: error.message,
    });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    // Checking if user exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      throw new Error("User not found");
    }

    // Comparing Password
    const validPassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!validPassword) {
      throw new Error("Invalid Password");
    }

    // Creating and Assigning token
    const token = jwt.sign({ userId: User._id }, process.env.jwt_secret, {
      expireIn: "1d",
    });

    // Sending Response
    res.send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Getting Current user

router.get("/get-current-user",authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req, res.userId);
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
