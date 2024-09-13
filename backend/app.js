const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const quizRoutes = require("./src/routes/quizRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api", quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
