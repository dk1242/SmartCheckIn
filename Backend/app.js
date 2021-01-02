const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/auth");

mongoose
  .connect(
    "mongodb+srv://dk1242:Dhruval@1242@cluster0.t4xrw.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB connected");
  });

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
