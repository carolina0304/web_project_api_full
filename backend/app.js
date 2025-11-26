const express = require("express");
const auth = require("./middlewares/auth");
const mongoose = require("mongoose"); //importa Mongoose.

const app = express(); //crea tu aplicacion.
app.use(express.json());

const mongo_url = "mongodb://localhost:27017/aroundb"; //URL de conexion a la base de datos MongoDB.

const { createUser, login } = require("./controllers/users");

//Rutas piblicas (sin autenticacion)
app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth); // A partir de aquí, todas las rutas necesitan autenticación

// MIDDLEWARE DE USUARIO TEMPORAL (solo para rutas protegidas)
app.use((req, res, next) => {
  req.user = {
    _id: "68e9085c26a52d0d03a22618", // pega el _id del usuario de prueba que creamos en el paso anterior
  };

  next();
});

// RUTAS PROTEGIDAS
const cardsRouter = require("./routes/cards.js");
app.use("/cards", cardsRouter);

//RUTAS
/*const usersRouter = require("./routes/users.js");
app.use("/users", usersRouter);

const cardsRouter = require("./routes/cards.js");
app.use("/cards", cardsRouter);*/

const PORT = 3000; //Define en que puerto.

(async () => {
  await mongoose.connect(mongo_url); //conecta a la base de datos MongoDB llamada "aroundb".
  console.log("Conectado a la base de datos MongoDB");
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  }); //Levanta el servidor y escucha en el puerto definido.
})(); //Funcion autoejecutable para manejar asincronía.

app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
}); //Manejo de rutas no encontradas.

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
