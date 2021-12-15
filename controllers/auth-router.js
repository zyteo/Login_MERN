// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const router = express.Router();
// get the CRUD operations
const AuthCtrl = require("./auth-ctrl");

// =======================================
//              GET ROUTES
// =======================================
// This is for login page
// router.get("/login", AuthCtrl.loginGet);

// =======================================
//              POST ROUTES
// =======================================
// This is for creating new account
router.post("/signup", AuthCtrl.createUser);
// This is for authenticating a current user
router.post("/login", requireAuth, AuthCtrl.loginUser);

// =======================================
//              DELETE ROUTES
// =======================================
// delete user
// :id is the user's id
router.delete("/users/:id", AuthCtrl.deleteUser);

module.exports = router;