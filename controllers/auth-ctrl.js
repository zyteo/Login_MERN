// =======================================
//              DATABASE
// =======================================
const User = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// for comparing password
const bcrypt = require("bcrypt");
// token for JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: process.env.JWT_maxAge,
  });
};

// Create all Auth operations
// status errors refer: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// Creating user (signup)
const createUser = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a user",
    });
  }

  try {
    // first check if the username / name already exists
    // find the username
    const checkUsername = await User.findOne({
      username: req.body.username,
    });
    // find the email
    const checkName = await User.findOne({
      name: req.body.name,
    });

    if (checkUsername !== null) {
      return res.status(409).json({
        message: "username exists",
      });
    } else if (checkName !== null) {
      return res.status(409).json({ message: "name exists" });
    }
    // All good - create user
    else if (checkUsername === null && checkName === null) {
      //overwrite the user password with the hashed password, then pass that in to our database
      req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
      );
      // default role is guest
      req.body.role = "User";
      const user = new User(req.body);
      await user.save();
      // create JWT
      const token = createToken(user._id);
      
      // somehow, if the new user doesn't exist, return error
      if (!user) {
        return res.status(400).json({ success: false, error: err });
      }
      
      // success!
      // send back cookie with JWT too
      res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.maxAge, secure: true});
      res.status(201).json({
        success: true,
        user: user._id,
        message: "User created!",
      });
    }
  } catch (err) {
    res.status(400).json({
      err,
      message: "User not created!",
    });
  }
};

// For deleting user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // remove the user
    await user.remove();
    // if the user doesnt exist, throw error
    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// For authentication
const getSession = async (req, res) => {
  const sessionUser = await req.session.currentUser;
  try {
    if (sessionUser) {
      res
        .status(200)
        .json({ success: true, message: "Authenticated!", data: sessionUser });
    }
  } catch (err) {
    res.status(401).json({ success: false, error: err });
  }
};

// For creating new session
const loginSession = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a valid user",
    });
  }

  try {
    const user = await User.findOne({ username: req.body.username });
    // somehow, if the new user doesn't exist, return error
    if (!user) {
      return res.status(400).json({ success: false, error: err });
    }
    // user exists. Check if passwords match.
    if (bcrypt.compareSync(req.body.password, user.password)) {

      // success!
      res.status(201).json({
        success: true,
        role: user.role,
        username: user.username,
        name: user.name,
        message: "Login success!",
      });
    } else {
      // wrong login information
      res.status(401).json({ success: false, error: err });
    }
  } catch (err) {
    res.status(400).json({
      err,
      message: "Login failed!",
    });
  }
};

// For deleting session
const deleteSession = async (req, res) => {
  try {
    await req.session.destroy();
    // success!
    res.status(201).json({
      success: true,
      message: "Logout success!",
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// export the modules - CRUD
// Read has 2 (for the index page--> showing all sessions, and for the show page--> show particular session)
module.exports = {
  createUser,
  deleteUser,
  getSession,
  loginSession,
  deleteSession,
};
