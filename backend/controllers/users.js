const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

/*module.exports.createUser = (req, res) => {
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
};*/

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

module.exports.createUser = (req, res) => {
  // Sacamos los datos que nos envía el usuario
  const { email, password, name, about, avatar } = req.body;

  // Hasheamos (encriptamos) la contraseña para que sea segura
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      // Creamos el usuario con la contraseña encriptada
      return User.create({
        email,
        password: hash, // guardamos la contraseña encriptada
        name,
        about,
        avatar,
      });
    })
    .then((user) => {
      // Enviamos la respuesta SIN la contraseña
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ message: "Error al crear usuario", error: err.message });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect password or email"));
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // los hashes no coinciden, se rechaza el promise
        return Promise.reject(new Error("Incorrect password or email"));
      }
      // autenticación exitosa
      const token = jwt.sign(
        { _id: user._id }, // payload con solo el _id
        "tu-clave-secreta", // clave secreta
        { expiresIn: "7d" } // expira en 7 días (una semana)
      );

      res.send({ token }); // envía el token al cliente
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
