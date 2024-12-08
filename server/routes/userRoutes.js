const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  auth,
} = require("../controller/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/update/:id", updateUser);
router.get("/auth", auth);

module.exports = router;
