const jwt = require("jsonwebtoken");
const { USERS } = require("../utils/dummy");
const { validatePassword } = require("../utils/validatePassword");

// Create a new quiz
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = USERS.find((user) => user.email === email);
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User not registered" });
    } else {
      const isValidPassword = validatePassword(user, password);

      if (!isValidPassword) {
        return res
          .status(400)
          .json({ status: false, msg: "Password doesnot match" });
      } else {
        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.SECRET_KEY, {
          expiresIn: "1h", // Signing a token with 1 hour of expiration:
        });
        return res.status(200).json({
          status: true,
          data: user,
          message: "logined successfully",
          accessToken: token,
        });
      }
    }
  } catch (error) {
    console.log("error =>", process.env.SECRET_KEY, error);
    res.status(500).json({ message: "Login failed!", error });
  }
};

// // Get all quizzes
// exports.getQuizzes = async (req, res) => {
//   try {
//     const quizzes = await Quiz.find();
//     res.status(200).json(quizzes);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching quizzes", error });
//   }
// };

// // Get a single quiz by ID
// exports.getQuizById = async (req, res) => {
//   try {
//     const quiz = await Quiz.findById(req.params.id);
//     if (!quiz) {
//       return res.status(404).json({ message: "Quiz not found" });
//     }
//     res.status(200).json(quiz);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching quiz", error });
//   }
// };

// // Update a quiz
// exports.updateQuiz = async (req, res) => {
//   try {
//     const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!quiz) {
//       return res.status(404).json({ message: "Quiz not found" });
//     }
//     res.status(200).json(quiz);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating quiz", error });
//   }
// };

// // Delete a quiz
// exports.deleteQuiz = async (req, res) => {
//   try {
//     const quiz = await Quiz.findByIdAndDelete(req.params.id);
//     if (!quiz) {
//       return res.status(404).json({ message: "Quiz not found" });
//     }
//     res.status(200).json({ message: "Quiz deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting quiz", error });
//   }
// };
