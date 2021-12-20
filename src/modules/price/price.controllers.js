const { validationResult } = require("express-validator");
const Prices = require("./models/Prices")

checkDateRange = async (initialDate, endDate) => {
  return await Prices.find(
    { $and:
      [
        {"initialDate" : {$lte : initialDate, $lte : endDate}},
        {"endDate" : {$gte : initialDate, $gte : endDate}},
      ]
    }
  ).count();
}

exports.addSalePriceGasoline = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const { initialDate, endDate } = req.body;
    if (initialDate > Date(Date.now()) || endDate > Date(Date.now())){
      return res.status(400).json({
        errors: [{ msg: "No se puede establecer precios a fechas inferiores a la actual" }],
      });
    } else if (initialDate > endDate ){
      return res.status(400).json({
        errors: [{ msg: "Verifique el Rango, la fecha final no puede ser inferior a la inicial" }],
      });
    } else {
      const checkRange = await checkDateRange(initialDate, endDate);
      if(checkRange === 0){
        const range = new Prices(req.body);
        await range.save();
        return res.status(201).json({
          msg: "Se ha registrado satisfactoriamente el rango y precios de venta",
          data: range,
        });
      } else {
          return res.status(400).json({
            errors: [{ msg: "Vefifique el rango de fechas ya que se encuentra definido precio de venta en uno o varios días del mismo" }],
          });
      };
    }  
  }
};

exports.getAllSalePriceGasoline = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const price = await Prices.find();
    if (price) {
      return res.status(200).json({
        msg: "Rangos de fecha y precios",
        data: price,
      });
    } else {
      return res.status(404).json({
        errors: [{ msg: "No existen registros de rangos de fecha y presios de venta de gasolina definidos" }],
      });
    }
  }
};

exports.getPriceByDate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const { date } = req.params;
    const price = await Prices.findOne(
      { $and:
        [
          {"initialDate" : {$lte : date}},
          {"endDate" : {$gte : date}}
        ]
      }
    )
    if (price) {
      return res.status(200).json({
        msg: "Precios de la Gasolina",
        data: price,
      });
    } else {
      return res.status(404).json({
        errors: [{ msg: "No se ha definido el precio de gasolina para la fecha: " + date }],
      });
    }
  }
};

exports.updateSalePriceGasoline = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { initialDate, endDate } = req.body;
      if (initialDate > Date(Date.now()) || endDate > Date(Date.now())){
        return res.status(400).json({
          errors: [{ msg: "No se puede establecer precios a fechas inferiores a la actual" }],
        });
      } else if (initialDate > endDate ){
        return res.status(400).json({
          errors: [{ msg: "Verifique el Rango, la fecha final no puede ser inferior a la inicial" }],
        });
      } else {
        const { idRange } = req.params;
        const checkRange = await Prices.find(
          { 
            _id : {$ne : idRange},
            $and:
            [
              {"initialDate" : {$lte : initialDate, $lte : endDate}},
              {"endDate" : {$gte : initialDate, $gte : endDate}},
            ]
          }
        ).count();
        if(checkRange === 0){
          const range = await Prices.findById({ _id: idRange });
          console.log(range)
          if (range) {
            await Prices.updateOne({ _id: idRange }, { $set: req.body });
            return res.status(200).json({
              msg: "Datos actualizado",
              data: req.body,
            });
          } else {
            return res.status(404).json({
              errors: [{ msg: "El rango de fechas no se encuentra registrado" }],
            });
          }
        } else {
          return res.status(400).json({
            errors: [{ msg: "Vefifique el rango de fechas ya que se encuentra definido precio de venta en uno o varios días del mismo" }],
          });
        }
      };
    }
  } catch (error) {
    console.error(error)
    return res.status(400).json({
      errors: [{ msg: "El parametro _id es inválido" }],
    });
  }
};
