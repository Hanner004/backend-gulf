const { Schema, model } = require("mongoose");

const vehicleSchema = Schema(
  {
    placa: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  }
);

module.exports = model("Vehicle", vehicleSchema, "Vehicle");
