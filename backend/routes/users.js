const auth = require("../middlewares/auth");
const {
  validateUserId,
  validateUpdateUser,
  validateUpdateAvatar,
} = require("../middlewares/validation");

const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserbyID,
  createUser,
  UpdateId,
  UpdateAvatar,
  infoUser,
} = require("../controllers/users.js");

const User = require("../models/user.js"); // ajusta la ruta según tu estructura

router.get("/", getUsers);

router.patch("/me", validateUpdateUser, UpdateId);

router.get("/me", infoUser);

router.patch("/me/avatar", validateUpdateAvatar, UpdateAvatar);

router.get("/:userId", validateUserId, getUserbyID);

/*router.post("/signup", createUser);*/

module.exports = router;
