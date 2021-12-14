const { Schema, model } = require("mongoose");

const historySchema = Schema({
  action: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  value: {
    type: Number,
  },
});

module.exports = model("Histories", historySchema, "Histories");
