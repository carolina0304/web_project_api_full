const validator = require("validator");

const mongoose = require("mongoose"); //importa Mongoose.

const userSchema = new mongoose.Schema({
  name: {
    type: String, // este campo se llamara name y guardara el nombre del usuario.
    required: false,
    minlength: 2, // especifica la longitud mínima/máxima de los campos
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    required: false,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png", // ✅ Valor por defecto
    validator: {
      //validador para comprobar que la URL es correcta.
      validator(v) {
        return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
          v
        );
      },
      message: "Por favor, introduce una Url válida",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: "Por favor, introduce un email válido",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 60,
    select: false, // Esta línea evita que el password se devuelva por defecto
  },
});

module.exports = mongoose.model("User", userSchema);
