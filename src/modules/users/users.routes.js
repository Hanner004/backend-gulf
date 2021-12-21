const { Router } = require("express");

const isAuth = require("../../middlewares/isAuth");

const {
  validateCreate,
  validateUpdate,
  validateStatus,
  validateRecharge,
  validateUpdatePass,
} = require("../../exports/validations/users.validations");

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  removeUser,
  statusUser,
  rechargeUser,
  updatePass,
} = require("./users.controllers");

const router = Router();

router.post("/", isAuth, validateCreate, createUser); //crear usuarios
router.get("/", isAuth, getUsers); //consultar usuarios
router.get("/:idUser", isAuth, getUser); //consultar usuario por id
router.put("/:idUser/updatePass", isAuth, validateUpdatePass, updatePass); //actualizar contraseña
router.put("/:idUser", isAuth, validateUpdate, updateUser); //actualizar usuario por id
router.delete("/:idUser", isAuth, removeUser); //eliminar usuario por id
router.put("/:idUser/status", isAuth, validateStatus, statusUser); //actualizar estado del usuario por id
router.post("/:idUser/wallet", isAuth, validateRecharge, rechargeUser); //recargar saldo

module.exports = router;
