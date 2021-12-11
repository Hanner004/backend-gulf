const { Router } = require("express");
const isAuth = require("../../middlewares/isAuth");
const {
  validateCreate,
  validateUpdate,
  validateStatus,
} = require("../../exports/validations/users.validations");
const {
  create,
  findAll,
  findOne,
  update,
  remove,
  status,
} = require("./users.controllers");

const router = Router();

router.post("/", isAuth, validateCreate, create);
router.get("/", isAuth, findAll);
router.get("/:id", isAuth, findOne);
router.put("/:id", isAuth, validateUpdate, update);
router.delete("/:id", isAuth, remove);
router.put("/:id/status", isAuth, validateStatus, status);

module.exports = router;
