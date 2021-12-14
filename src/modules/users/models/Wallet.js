const { Schema, model } = require("mongoose");
const History = require("./History").schema;

const walletSchema = Schema({
  money: {
    type: Number,
    required: true,
  },
  history: [History],
});

module.exports = model("Wallets", walletSchema, "Wallets");
