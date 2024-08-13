const {
  createUser,
  updateUser,
  listUser,
  getById,
  deleteUser,
} = require("../Controller/controller");

const router = require("express").Router();

router.post("/create", createUser);
router.put("/update", updateUser);
router.get("/list", listUser);
router.get("/byId", getById);
router.delete("/delete", deleteUser);

module.exports = router;
