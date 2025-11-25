const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserbyID,
  createUser,
  UpdateId,
  UpdateAvatar,
} = require("../controllers/users.js");

const User = require("../models/user.js"); // ajusta la ruta según tu estructura

router.get("/", getUsers);

router.get("/:userId", getUserbyID);

router.post("/", createUser);

router.patch("/me", UpdateId);

router.patch("/me/avatar", UpdateAvatar);

module.exports = router;
