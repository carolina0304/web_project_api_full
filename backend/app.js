const express = require("express");

const cors = require("cors");

const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandle.js");
const mongoose = require("mongoose"); //importa Mongoose.

const app = express(); //crea tu aplicacion.

// Habilitar CORS antes de otras rutas
/*app.use(cors());
app.options("*", cors());*/
const whitelist = [
  "http://localhost:5173",
  "https://wrwt.chanka.com",
  "http://wrwt.chanka.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // si usas cookies / auth
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Configurar CORS
app.use(cors(corsOptions));

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
