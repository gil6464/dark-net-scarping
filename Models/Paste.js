const mongoose = require("mongoose");
const { Schema } = mongoose;

const pasteSchema = new mongoose.Schema({
  title: { type: String, require: true },
  text: { type: String, require: true },
  author: { type: String, require: true },
  time: { type: String, require: true },
});

module.exports = mongoose.model("Paste", pasteSchema);
