const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
const usersRouter = require("./routes/users.routes");
const questionsRouter = require("./routes/question.routes");

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", usersRouter);
app.use("/api/v1", questionsRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB database", err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
