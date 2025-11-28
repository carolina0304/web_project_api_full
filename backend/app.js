const express = require("express");
const auth = require("./middlewares/auth");
const mongoose = require("mongoose"); //importa Mongoose.

const app = express(); //crea tu aplicacion.
app.use(express.json());

const mongo_url = "mongodb://localhost:27017/aroundb"; //URL de conexion a la base de datos MongoDB.

/*import React, { useState, useEffect } from "react";

function App() {
  // Estado para el token
  const [token, setToken] = useState("");

  // Estado para saber si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Estado para los datos del usuario
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    // Verificar si hay un token guardado en localStorage
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
      // Aquí verificarías si el token es válido
      // Por ahora, asumimos que sí
      setIsLoggedIn(true);
    }
  }, []); // Array vacío = se ejecuta solo al montar

  // Función para manejar el login exitoso
  const handleLogin = (token, userData) => {
    // Guardar el token en localStorage
    localStorage.setItem("token", token);

    // Actualizar los estados
    setToken(token);
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  // Función para manejar el logout
  const handleLogout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem("token");

    // Limpiar los estados
    setToken("");
    setCurrentUser({});
    setIsLoggedIn(false);
  };
}*/

const { createUser, login } = require("./controllers/users");

//Rutas piblicas (sin autenticacion)
app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth); // A partir de aquí, todas las rutas necesitan autenticación

//RUTAS PROTEGIDAS
const usersRouter = require("./routes/users.js");
app.use("/users", usersRouter);

const cardsRouter = require("./routes/cards.js");
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
}); //Manejo de rutas no encontradas.

const PORT = 3000; //Define en que puerto.

(async () => {
  await mongoose.connect(mongo_url); //conecta a la base de datos MongoDB llamada "aroundb".
  console.log("Conectado a la base de datos MongoDB");
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  }); //Levanta el servidor y escucha en el puerto definido.
})(); //Funcion autoejecutable para manejar asincronía.

// MIDDLEWARE DE USUARIO TEMPORAL (solo para rutas protegidas)
/*app.use((req, res, next) => {
  req.user = {
    _id: "68e9085c26a52d0d03a22618", // pega el _id del usuario de prueba que creamos en el paso anterior
  };

  next();
});*/

//RUTAS

/*const cardsRouter = require("./routes/cards.js");
app.use("/cards", cardsRouter);*/

/*const { celebrate, Joi } = require("celebrate");
router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4).max(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL),
    }),
  }),
  createUser
);*/
