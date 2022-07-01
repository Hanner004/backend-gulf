const { validationResult } = require("express-validator");
const moment = require('moment');
const Gasoline = require("./models/Gasoline");
const Prices = require("../price/models/Prices")

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

addGasolineDefault = async () =>{
  await Gasoline.insertMany(
    [
      { "type": "Corriente" },
      { "type": "Extra" }
    ]);
  return this.getAllGasoline();
}

getPricesNow = async () => {
  const date = moment().format('YYYY[-]MM[-]DD');  
  return await Prices.findOne(
    { $and:
      [
        {"initialDate" : {$lte : date}},
        {"endDate" : {$gte : date}}
      ]
    }
  );
};

exports.getAllGasoline = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    var gasoline = await Gasoline.find().count();
    gasoline===0 ? addGasolineDefault() :  gasoline = await Gasoline.find()
    if (gasoline) {
      const price = await getPricesNow();
      gasoline.map((gasol) => { 
        if (gasol.type === "Corriente" && price){
          gasol.price = price.amountCurrent;
        } else if (gasol.type === "Extra" && price)
          gasol.price = price.amountExtra;
      })
      return res.status(200).json({
        msg: "Gasolinas",
        data: gasoline,
      });
    } else {
      console.log("No hay")
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
    if (!gasoline.isEmpty()) {
      const price = await getPricesNow();
      if (gasoline.type === "Corriente" && price){
        gasoline.price = price.amountCurrent;
      } else if (gasoline.type === "Extra" && price)
        gasoline.price = price.amountExtra;
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
        return res.status(400).json({
          errors: [{ msg: "Operación no autorizada" }]
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
    status = "Agotado";
  } else {
    status = true;
  }
  await Gasoline.updateOne(
    { type },
    {
      $set : {
        "status": "Disponible",
      }
    }
  ); 
};