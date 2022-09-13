const express = require("express");
const router = express.Router();

module.exports = router;

const {
  signin,
  signup,
  forgot,
  verifyToken,
  resetPass,
  checkToken,
} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot", forgot);
router.post("/verify-token", verifyToken);
router.get("/check-token/:token", checkToken);
router.post("/reset-pass", resetPass);
