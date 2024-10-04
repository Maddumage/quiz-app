const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./src/db/connection");
const authRoutes = require("./src/routes/authRoutes");
const quizRoutes = require("./src/routes/quizRoutes");


dotenv.config();

async function main() {
  await connectDB();

  let db = mongoose.connection;
  db.on("connected", () => console.log("Db Connceted"));

  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  const app = express();
  app.use(
    bodyParser.urlencoded({
      limit: "5mb",
      parameterLimit: 500000,
      extended: false,
    })
  );

  app.use(
    bodyParser.json({
      limit: "5mb",
    })
  );

  app.use(cors());

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api", quizRoutes);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();
