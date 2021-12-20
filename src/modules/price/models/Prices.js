const { Schema, model } = require("mongoose");

const pricesSchema = Schema(
  {
    initialDate: {
      type: Date,
      require: true,
    },
    endDate: {
      type: Date,
      require: true,
    },
    amountCurrent: {
      type: Number,
      default: 0,
    },
    amountExtra: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Prices", pricesSchema, "Prices");