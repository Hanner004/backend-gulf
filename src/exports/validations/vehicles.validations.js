const { body } = require("express-validator");

validateVehicle = [
  body("placa")
    .not()
    .isEmpty()
    .withMessage("La placa del vehículo es requerida")
    .isString()
    .withMessage("La placa no es válida"),

  body("model")
    .not()
    .isEmpty()
    .withMessage("El modelo del vehículo es requerido")
    .isString()
    .withMessage("El modelo no es válido"),

  body("capacity")
    .not()
    .isEmpty()
    .withMessage("La capacidad del vehículo es requerida")
    .isNumeric()
    .withMessage("El capacidad no es válida"),
];

module.exports = {
  validateVehicle,
};
