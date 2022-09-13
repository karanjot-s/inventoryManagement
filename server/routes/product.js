const express = require("express");
const router = express.Router();

module.exports = router;

const {
  create,
  getAll,
  getOne,
  update,
  deletePrd,
  getEverything,
} = require("../controllers/product");
const { authenticateToken } = require("../utils/auth");

router.get("/", authenticateToken, getAll);
router.get("/all", authenticateToken, getEverything);
router.get("/:id", authenticateToken, getOne);
router.post("/", authenticateToken, create);
router.put("/:id", authenticateToken, update);
router.delete("/:id", authenticateToken, deletePrd);
