const express = require("express");
const router = express.Router();

module.exports = router;

const { updateProfile, updatePassword } = require("../controllers/user");
const { authenticateToken } = require("../utils/auth");

router.post("/update", authenticateToken, updateProfile);
router.post("/update-pass", authenticateToken, updatePassword);
