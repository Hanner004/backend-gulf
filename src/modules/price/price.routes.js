const { Router } = require("express");

const isAuth = require("../../middlewares/isAuth");
const {
  addSalePriceGasoline,
  getAllSalePriceGasoline,
  getPriceByDate,
  updateSalePriceGasoline,
} = require("./price.controllers");

const router = Router();

router.post("/", isAuth, addSalePriceGasoline); // agregar precio y rango
router.get("/", isAuth, getAllSalePriceGasoline); // listar coleccion de precios
router.get("/:date", isAuth, getPriceByDate); // consultar precio en una fecha especifica
router.put("/:idRange", isAuth, updateSalePriceGasoline); //actualizar

module.exports = router;
