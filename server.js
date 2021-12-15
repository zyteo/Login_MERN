// =======================================
//              DEPENDENCIES
// =======================================
require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRouter = require("./controllers/auth-router");
const cookieParser = require('cookie-parser');
// const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const PORT = process.env.PORT ?? 8000;

// =======================================
//              MIDDLEWARE
// =======================================
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", authRouter);
app.use(cookieParser());


// =======================================
//              CONFIGURATION
// =======================================
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .catch((err) => {
    console.error("Connection error", err.message);
  });
mongoose.connection.on("error", (err) =>
  console.log(err.message + "Mongod not running")
);

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));