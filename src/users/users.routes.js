const { Router } = require("express");
const {
  validateCreate,
  validateUpdate,
} = require("../exports/validations/users.validations");
const {
  create,
  findAll,
  findOne,
  update,
  remove,
} = require("./users.controllers");

const router = Router();

router.post("/users", validateCreate, create);
router.get("/users", findAll);
router.get("/users/:_id", findOne);
router.put("/users/:_id", validateUpdate, update);
router.delete("/users/:_id", remove);

module.exports = router;
