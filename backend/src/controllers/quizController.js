const { connectToDb } = require("../db/connection");
const Quiz = require("../models/quizModel");

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res
      .status(201)
      .json({ status: true, data: newQuiz, message: "Quiz Created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error });
  }
};

// Get all quizzes
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({ status: true, data: quizzes, message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error });
  }
};

// Get a single quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz", error });
  }
};

// Update a quiz
exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error updating quiz", error });
  }
};

// Delete a quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error });
  }
};
