require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const { scrape } = require("./app");
const app = express();
app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`App listening at http://localhost:${PORT}`)
    );
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });
// scrape();
