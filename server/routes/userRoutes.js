const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  authenticateToken,
} = require("../controller/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/update/:id", updateUser);

module.exports = router;
