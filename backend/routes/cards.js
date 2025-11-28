const auth = require("../middlewares/auth");

const express = require("express");
const router = express.Router();

const {
  getCards,
  createNewcard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards.js");

const Card = require("../models/card.js");

router.get("/", auth, getCards);

router.post("/", auth, createNewcard);

router.delete("/:cardId", auth, deleteCard);

router.put("/:cardId/likes", auth, likeCard);

router.delete("/:cardId/likes", auth, dislikeCard);

module.exports = router;
