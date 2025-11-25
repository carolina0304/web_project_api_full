const User = require("../models/user.js");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users }); //✅ Envía los usuarios al cliente
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error interno del servidor" }); // ✅ Envía error 500
    });
};

module.exports.getUserbyID = (req, res) => {
  User.findById(req.params.userId)
    .orFail() //convierte el null en un error real
    .then((user) => {
      // Solo llega aquí si SÍ encontró el usuario
      res.send({ data: user });
    })
    .catch((err) => {
      // Ahora SÍ captura el error cuando no encuentra el usuario
      if (err.name === "DocumentNotFoundError") {
        res.status(404).send({ message: "Usuario no encontrado" });
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "ID inválido" });
      } else {
        res.status(500).send({ message: "Error interno del servidor" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Datos inválidos" });
      } else {
        res.status(500).send({ message: "Error interno del servidor" });
      }
    });
};

module.exports.UpdateId = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id, //primer parametro:ID del usuario
    { name: req.body.name, about: req.body.about }, // segundo parámetro: campos a actualizar
    { new: true, runValidators: true } // tercer parámetro: opciones
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Error" }));
};

module.exports.UpdateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id, // primer parámetro: ID del usuario
    { avatar: req.body.avatar }, // segundo parámetro: campo avatar a actualizar
    { new: true, runValidators: true } // tercer parámetro: opciones
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Error" }));
};
