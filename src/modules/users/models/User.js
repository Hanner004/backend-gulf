const { Schema, model } = require("mongoose");
const Wallet = require("./Wallet").schema;

const userSchema = Schema(
  {
    tDoc: {
      type: String,
      required: true,
    },
    numDoc: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      require: true,
    },
    wallet: Wallet,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Users", userSchema, "Users");
