const { Router } = require("express");
const {
  validateCreate,
  validateUpdate,
  validateStatus,
} = require("../exports/validations/users.validations");
const {
  create,
  findAll,
  findOne,
  update,
  remove,
  status,
} = require("./users.controllers");

const router = Router();

router.post("/users", validateCreate, create);
router.get("/users", findAll);
router.get("/users/:_id", findOne);
router.put("/users/:_id", validateUpdate, update);
router.delete("/users/:_id", remove);
router.put("/users/:_id/status",validateStatus, status);

module.exports = router;
