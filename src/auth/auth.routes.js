const { Router } = require("express");
const { validateRegister } = require("../exports/validations/auth.validations");
const { register, login } = require("./auth.controllers");

const router = Router();

router.post("/auth/register", validateRegister, register);
router.post("/auth/login", login);

module.exports = router;
