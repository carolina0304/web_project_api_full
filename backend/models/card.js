const mongoose = require("mongoose"); //importa Mongoose.

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String, // este campo se llamara name y guardara el nombre de la tarjeta.
      required: true, // este campo es obligatorio
      minlength: 2, // especifica la longitud mínima/máxima de los campos
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validator: {
        //validador para comprobar que la URL es correcta.
        validator(v) {
          return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
            v
          );
        },
        message: "Por favor, introduce una Url imagen válida",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId, //Tipo de dato especial para IDs de MongoDB
      ref: "User", //Referencia al modelo User
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], //Array de IDs de usuarios que han dado "me gusta"
      default: [], //Valor por defecto es un array vacío
    },
  },
  { timestamps: true }
); //timestamps añade automáticamente campos createdAt y updatedAt.

module.exports = mongoose.model("Card", cardSchema);
