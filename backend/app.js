const express = require("express");

const cors = require("cors");

const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandle.js");
const mongoose = require("mongoose"); //importa Mongoose.

const app = express(); //crea tu aplicacion.

// Configurar CORS
app.use(
  cors({
    origin: "http://localhost:5173", // URL de tu frontend
    credentials: true,
  })
);

// Configurar Express para confiar en proxies
app.set("trust proxy", true);

app.use(express.json());

const mongo_url = "mongodb://localhost:27017/aroundb"; //URL de conexion a la base de datos MongoDB.

const { createUser, login } = require("./controllers/users");
const { errors } = require("celebrate");

const { validateSignUp, validateSignIn } = require("./middlewares/validation");

//Rutas piblicas (sin autenticacion)
app.post("/signin", validateSignIn, login);
app.post("/signup", validateSignUp, createUser);

app.use(auth); // A partir de aquí, todas las rutas necesitan autenticación

//RUTAS PROTEGIDAS
const usersRouter = require("./routes/users.js");
app.use("/users", usersRouter);

const cardsRouter = require("./routes/cards.js");

app.use("/cards", cardsRouter);

//Agregar el middleware de errores
app.use(errors());
app.use(errorHandler);

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

/*const { celebrate, Joi, errors } = require("celebrate");
const validator = require("validator");

//Declarar la funcion de validacion
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

//Declarar todos los esquemas de validacion
// Esquema de validación para registro
const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
  }),
});

// Esquema de validación para login
const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});



// Validación para actualizar perfil de usuario
const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

// Validación para actualizar avatar
const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

// Validación para parámetros de usuario (ID)
const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

// Validación para crear tarjeta
const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

// Validación para parámetros de tarjeta (ID)
const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

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
