function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Manejo específico de ciertos tipos de errores
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).json({ message: "Error de sintaxis en el cuerpo de la solicitud" });
    return;
  }

  // Manejo de otros errores
  res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
}

module.exports = errorHandler;
