require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const { scrape } = require("./app");
const Paste = require("./Models/Paste");
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`App listening at http://localhost:${PORT}`)
    );
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.get("/", async (req, res) => {
  const data = await Paste.find({}).sort([["time", -1]]);

  res.send(data);
});

scrape();
setInterval(() => {
  scrape();
}, 120000);
