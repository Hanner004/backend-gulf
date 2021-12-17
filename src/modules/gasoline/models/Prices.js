const { Schema, model } = require("mongoose");

const pricesSchema = Schema(
  {
    initialDate: {
      type: Date,
      default: Date.now(),
    },
    endDate: {
      type: Date,
      default: Date.now(),
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Prices", pricesSchema, "Prices");

exports.addSalePriceGasoline = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const { type, initialDate, endDate, amount } = req.body;
    const gasoline = await Gasoline.findOne({ type });
    if (gasoline) {
      await Gasoline.updateOne(
        { type },
        {
          $addToSet : {
            "prices": {
              "initialDate": initialDate,
              "endDate": endDate,
              "amount": amount,
            }
          }
        }
      );
      return res.status(200).json({
        msg: "Se guardó el registro del rango y precio de venta",
      });
    } else {
      return res.status(200).json({
        msg: "Operación no autorizada",
      });
    } 
  }
};
