const auth = require("../middlewares/auth");

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

router.get("/:userId", auth, getUserbyID);

/*router.post("/", createUser);*/

router.patch("/me", auth, UpdateId);

router.patch("/me/avatar", auth, UpdateAvatar);

router.get("/me", auth, infoUser);

module.exports = router;
