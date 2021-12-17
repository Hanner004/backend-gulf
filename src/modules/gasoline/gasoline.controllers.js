const { validationResult } = require("express-validator");
const Gasoline = require("./models/Gasoline");
const Prices = require("./models/Prices")

exports.addTypeGasoline = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const { type } = req.body;
    const gasoline = await Gasoline.findOne({ type });
    if (gasoline) {
      return res.status(400).json({
        errors: [{ msg: "El tipo de gasolina esta registrado" }],
      });
    } else {
      const addGasoline = new Gasoline(req.body);
      await addGasoline.save();
      return res.status(201).json({
        msg: "El Tipo de gasolina se ha registrado satisfactoriamente",
        data: addGasoline,
      });
    }
  }
};

exports.getAllGasoline = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const gasoline = await Gasoline.find();
    if (gasoline) {
      return res.status(200).json({
        msg: "Gasolinas",
        data: gasoline,
      });
    } else {
      return res.status(404).json({
        errors: [{ msg: "No existen registros de tipos de gasolina" }],
      });
    }
  }
};

exports.getGasolineByType = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const { type } = req.params;
    const gasoline = await Gasoline.findOne({ type });
    if (gasoline) {
      return res.status(200).json({
        msg: "Gasolina",
        data: gasoline,
      });
    } else {
      return res.status(404).json({
        errors: [{ msg: "El tipo de gasolina no se encuentra registrado" }],
      });
    }
  }
};

exports.updateStockGasoline = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      var { type, stock, operation } = req.body;
      if (operation === "Tank" && (stock *= (-1)) || operation === "Recharge"){
        await Gasoline.updateOne(
          { type },
          {
            $inc : {
              "stock": stock,
            }
          },
          {
            upsert: true //Si no existe el registro lo crea
          }
        );
        await updateStatusGasoline(type);
        return res.status(200).json({
          msg: "Se realizó la actualización de la cantidad y estado de la gasolina",
        });
      } else {
        return res.status(200).json({
          msg: "Operación no autorizada",
        });
      };
    } 
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      errors: [{ msg: "No se pudo realizar la actualización" }],
    });
  }
}

updateStatusGasoline = async (type) => {
  const gasoline = await Gasoline.findOne({ type });
  var status;
  if (gasoline.stock <= 0) {
    status = false;
  } else {
    status = true;
  }
  await Gasoline.updateOne(
    { type },
    {
      $set : {
        "status": status,
      }
    }
  ); 
}

//EStoy trabajando en la gestion de fechas 
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