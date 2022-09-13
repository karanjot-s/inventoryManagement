const express = require("express");
const router = express.Router();

module.exports = router;

const {
  create,
  getAll,
  getOne,
  update,
  deleteCat,
} = require("../controllers/category");
const { authenticateToken } = require("../utils/auth");

router.get("/", authenticateToken, getAll);
router.get("/:id", authenticateToken, getOne);
router.post("/", authenticateToken, create);
router.put("/:id", authenticateToken, update);
router.delete("/:id", authenticateToken, deleteCat);
