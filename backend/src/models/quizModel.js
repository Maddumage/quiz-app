const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ optionText: String }],
      correctAnswer: { type: String, required: true },
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
