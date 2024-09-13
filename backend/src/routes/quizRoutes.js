const express = require("express");

const router = express.Router();

const {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

// Define routes for CRUD operations
router.post("/quizzes", createQuiz); // Create
router.get("/quizzes", getQuizzes); // Read all
router.get("/quizzes/:id", getQuizById); // Read single
router.put("/quizzes/:id", updateQuiz); // Update
router.delete("/quizzes/:id", deleteQuiz); // Delete

module.exports = router;
