const { Router } = require("express");
const {
  validateRegister,
  validateLogin,
} = require("../../exports/validations/auth.validations");
const { register, login } = require("./auth.controllers");

const router = Router();

router.post("/auth/register", validateRegister, register);
router.post("/auth/login", validateLogin, login);

module.exports = router;
