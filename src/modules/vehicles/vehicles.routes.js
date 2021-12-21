const { Router } = require("express");

const isAuth = require("../../middlewares/isAuth");

const {
  validateVehicle,
} = require("../../exports/validations/vehicles.validations");

const {
  createVehicle,
  getVehicles,
  updateVehicle,
  removeVehicle,
  getVehiclesByNumDoc,
  tankVehicle,
} = require("./vehicles.controllers");

const router = Router();

router.post("/users/:idUser", isAuth, validateVehicle, createVehicle); //crear vehículo
router.get("/users/:idUser", isAuth, getVehicles); //consultar vehículos del usuario
router.get("/users/numDoc/:numDoc", isAuth, getVehiclesByNumDoc); //consultar vehículos otros usuarios por número de documento
router.put("/:idVehicle/users/:idUser", isAuth, validateVehicle, updateVehicle); //editar vehículo
router.delete("/:idVehicle/users/:idUser", isAuth, removeVehicle); //eliminar vehículo
router.post("/:idVehicle/tank", isAuth, tankVehicle); //tanquear vehículo

module.exports = router;
