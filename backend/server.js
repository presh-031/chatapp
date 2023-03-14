import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
// routes imports
import users from "./routes/users.js";

const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(morgan("dev"));

// connect to db
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Listen for requests
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Connected to db & Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.use("/api/users", users);
