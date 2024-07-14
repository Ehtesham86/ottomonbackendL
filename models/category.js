const mongoose = require("mongoose");

const Category = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 },
  createdAt: { type: Date, default: Date.now },
});

module.exports.Category = mongoose.model("category", Category);
