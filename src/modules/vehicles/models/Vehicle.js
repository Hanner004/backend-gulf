const { Schema, model } = require("mongoose");

const vehicleSchema = Schema({
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
  tank: {
    type: {
      type: String,
    },
    gallons: {
      type: Number,
    },
  },
});

module.exports = model("Vehicles", vehicleSchema, "Vehicles");
