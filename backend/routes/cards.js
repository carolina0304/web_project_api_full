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

router.get("/", getCards);

router.post("/", createNewcard);

router.delete("/:cardId", deleteCard);

router.put("/:cardId/likes", likeCard);

router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
