const express = require("express");

const router = express.Router();

const { login } = require("../controllers/authController");

// Define routes for CRUD operations
router.post("/login", login); // Create

module.exports = router;
