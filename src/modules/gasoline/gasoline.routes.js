const { Router } = require("express");

const isAuth = require("../../middlewares/isAuth");
const { addTypeGasoline, getAllGasoline, getGasolineByType, updateStockGasoline, addSalePriceGasoline } = require("./gasoline.controllers");

const router = Router();

router.post("/", isAuth, addTypeGasoline); //agregar un tipo de gasolina
router.get("/", isAuth, getAllGasoline); //listar gasolinas
router.get("/:type", isAuth, getGasolineByType); //consultar por tipo de gasolina
router.put("/", isAuth, updateStockGasoline); //actualizar stock de gasolina por operacion (Tanqueo=Tank o Abastecer=Recharge)
router.post("/price", isAuth, addSalePriceGasoline); // agregar precio y rango - En construccion

module.exports = router;