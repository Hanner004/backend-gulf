const { Router } = require("express");
const isAuth = require("../../middlewares/isAuth");
const {
  validateCreate,
  validateUpdate,
  validateStatus,
  validateRecharge,
} = require("../../exports/validations/users.validations");
const {
  create,
  findAll,
  findOne,
  update,
  remove,
  status,
  recharge,
} = require("./users.controllers");

const router = Router();

router.post("/", isAuth, validateCreate, create); //crear usuarios
router.get("/", isAuth, findAll); //consultar usuarios
router.get("/:id", isAuth, findOne); //consultar usuario por id
router.put("/:id", isAuth, validateUpdate, update); //actualizar usuario por id
router.delete("/:id", isAuth, remove); //eliminar usuario por id
router.put("/:id/status", isAuth, validateStatus, status); //actualizar estado del usuario por id
router.post("/:id/wallet", isAuth, validateRecharge, recharge); //recargar saldo

module.exports = router;
