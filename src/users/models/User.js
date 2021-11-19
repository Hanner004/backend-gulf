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
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Users", userSchema, "Users");
