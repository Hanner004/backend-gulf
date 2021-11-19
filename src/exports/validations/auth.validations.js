const { body } = require("express-validator");

validateRegister = [
  body("tDoc")
    .not()
    .isEmpty()
    .withMessage("El tipo de documento es requerido")
    .isString()
    .withMessage("El tipo de documento no es válido"),

  body("numDoc")
    .not()
    .isEmpty()
    .withMessage("El número de documento es requerido")
    .isAlphanumeric()
    .withMessage("El número de documento no es válido"),

  body("name")
    .not()
    .isEmpty()
    .withMessage("El nombre es requerido")
    .isString()
    .withMessage("El nombre no es válido"),

  body("lastname")
    .not()
    .isEmpty()
    .withMessage("El apellido es requerido")
    .isString()
    .withMessage("El apellido no es válido"),

  body("email")
    .not()
    .isEmpty()
    .withMessage("El correo electrónico es requerido")
    .isEmail()
    .withMessage("El correo electrónico no es válido"),

  body("password")
    .not()
    .isEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 5 })
    .withMessage("La longitud de la contraseña debe ser superior o igual a 5"),
];

validateLogin = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("El correo electrónico es requerido")
    .isEmail()
    .withMessage("El correo electrónico no es válido"),

  body("password")
    .not()
    .isEmpty()
    .withMessage("La contraseña es requerida"),
];

module.exports = {
  validateRegister,
  validateLogin,
};
