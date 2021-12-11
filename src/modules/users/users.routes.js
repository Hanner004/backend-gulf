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

router.post("/users", isAuth, validateCreate, create);
router.get("/users", isAuth, findAll);
router.get("/users/:id", isAuth, findOne);
router.put("/users/:id", isAuth, validateUpdate, update);
router.delete("/users/:id", isAuth, remove);
router.put("/users/:id/status", isAuth, validateStatus, status);

module.exports = router;
