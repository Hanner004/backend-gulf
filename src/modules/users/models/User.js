const { Schema, model } = require("mongoose");

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
    wallet: {
      money: {
        type: Number,
        default: 0,
      },
      history: [],
    },
    vehicles_id: [],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Users", userSchema, "Users");
