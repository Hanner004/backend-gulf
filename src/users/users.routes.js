const { Router } = require("express");
const {
  create,
  findAll,
  findOne,
  update,
  remove,
} = require("./users.controllers");

const router = Router();

router.post("/users/create", create);
router.get("/users/findAll", findAll);
router.get("/users/findOne/:_id", findOne);
router.put("/users/update/:_id", update);
router.delete("/users/remove/:_id", remove);

module.exports = router;