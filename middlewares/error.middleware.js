// Función errorHandler que se exporta como un módulo
function errorHandler(err, req, res, next) {
  // Imprime la pila de llamadas del error en la consola
  console.error(err.stack);

  // Manejo específico de ciertos tipos de errores
  // Si el error es un error de sintaxis y el estado del error es 400 y el error tiene una propiedad "body"
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // Envía una respuesta con estado 400 y un mensaje de error
    res.status(400).json({ message: "Error de sintaxis en el cuerpo de la solicitud" });
    return;
  }

  // Manejo de otros errores
  // Envía una respuesta con estado 500 y un mensaje de error
  res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
}

// Exporta la función errorHandler como un módulo
module.exports = errorHandler;
