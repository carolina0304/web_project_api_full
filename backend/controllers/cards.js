const Card = require("../models/card.js");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards }); //✅ Envía las cartas al cliente
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error interno del servidor" }); // ✅ Envía error 500
    });
};

module.exports.createNewcard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Datos inválidos" });
      } else {
        res.status(500).send({ message: "Error interno del servidor" });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  console.log("🔍 DELETE: Función deleteCard ejecutándose");
  console.log("🔍 DELETE: Card ID:", req.params.cardId);
  console.log("🔍 DELETE: Usuario actual:", req.user._id);

  Card.findById(req.params.cardId)
    .orFail() //convierte el null en un error real
    .then((card) => {
      console.log("🔍 DELETE: Tarjeta encontrada");
      console.log(
        "🔍 DELETE: Propietario de la tarjeta:",
        card.owner.toString()
      );
      console.log("🔍 DELETE: Usuario actual:", req.user._id);
      console.log(
        "🔍 DELETE: ¿Son iguales?",
        card.owner.toString() === req.user._id
      );
      // Verificar si el usuario es el propietario - ERROR 403
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: "Acceso denegado" });
      }
      // Si es el propietario, eliminar la tarjeta
      return Card.findByIdAndDelete(req.params.cardId);
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(404).send({ message: "Tarjeta no encontrada" });
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "ID inválido" });
      } else {
        res.status(500).send({ message: "Error interno del servidor" });
      }
    });
};

//✅ USA orFail() cuando:
//- findById() - Buscas un registro específico
//- findOne() - Buscas un registro con condiciones específicas
//- findByIdAndUpdate() - Actualizas un registro específico
//- findByIdAndDelete() - Eliminas un registro específico

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId, // primer parámetro: ID de la tarjeta
    { $addToSet: { likes: req.user._id } }, // agrega _id al array si aún no está ahí
    { new: true }
  )
    .orFail() // Convierte null en error si no encuentra la tarjeta
    .then((card) => {
      res.send({ data: card }); // ✅ Envía la tarjeta actualizada
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(404).send({ message: "Tarjeta no encontrada" });
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "ID inválido" });
      } else {
        res.status(500).send({ message: "Error interno del servidor" });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // elimina _id del array
    { new: true }
  )
    .orFail() // Convierte null en error si no encuentra la tarjeta
    .then((card) => {
      res.send({ data: card }); // ✅ Envía la tarjeta actualizada
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(404).send({ message: "Tarjeta no encontrada" });
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "ID inválido" });
      } else {
        res.status(500).send({ message: "Error interno del servidor" });
      }
    });
};
