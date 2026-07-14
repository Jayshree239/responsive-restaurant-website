const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["Starter", "Lunch", "Dinner"],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,  // image path
    required: true
  }
});

module.exports = mongoose.model("Menu", menuSchema);
