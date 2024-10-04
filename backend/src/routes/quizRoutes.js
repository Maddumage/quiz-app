const express = require("express");

const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");

const {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

// Define routes for CRUD operations
router.post("/quizzes", verifyToken, createQuiz); // Create
router.get("/quizzes", verifyToken, getQuizzes); // Read all
router.get("/quizzes/:id", verifyToken, getQuizById); // Read single
router.put("/quizzes/:id", verifyToken, updateQuiz); // Update
router.delete("/quizzes/:id", verifyToken, deleteQuiz); // Delete

module.exports = router;
