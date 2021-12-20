const { Schema, model } = require("mongoose");

const gasolineSchema = Schema(
  {
    type: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Gasoline", gasolineSchema, "Gasoline");
