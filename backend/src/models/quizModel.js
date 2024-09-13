const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  questions: {
    type: ["Mixed"],
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
