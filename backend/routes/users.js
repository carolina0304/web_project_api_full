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
  /*createUser,*/
  UpdateId,
  UpdateAvatar,
  infoUser,
} = require("../controllers/users.js");

const User = require("../models/user.js"); // ajusta la ruta según tu estructura

router.get("/", auth, getUsers);

router.get("/:userId", auth, validateUserId, getUserbyID);

/*router.post("/", createUser);*/

router.patch("/me", auth, validateUpdateUser, UpdateId);

router.patch("/me/avatar", auth, validateUpdateAvatar, UpdateAvatar);

router.get("/me", auth, infoUser);

module.exports = router;
