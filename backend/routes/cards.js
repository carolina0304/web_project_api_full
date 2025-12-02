const auth = require("../middlewares/auth");
const {
  validateCreateCard,
  validateCardId,
} = require("../middlewares/validation");

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

router.post("/", auth, validateCreateCard, createNewcard);

router.delete("/:cardId", auth, validateCardId, deleteCard);

router.put("/:cardId/likes", auth, validateCardId, likeCard);

router.delete("/:cardId/likes", auth, validateCardId, dislikeCard);

module.exports = router;
