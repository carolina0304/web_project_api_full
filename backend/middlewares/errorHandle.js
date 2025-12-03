const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === 500 ? "Se ha producido un error en el servidor" : message,
  });
};

module.exports = errorHandler;

//Captura todos los errores que ocurran en tu aplicación
//Envía respuestas consistentes al frontend
//Oculta errores internos del servidor (por seguridad)
