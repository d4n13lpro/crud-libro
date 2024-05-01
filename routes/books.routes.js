// Importamos los módulos necesarios
const express = require("express");
const router = express.Router();
const BookService = require("../services/books.service");

// Middleware para pasar la conexión a la base de datos a todas las solicitudes
router.use((req, res, next) => {
  // Asumimos que req.db contiene la conexión a la base de datos
  const bookService = new BookService(req.db);
  req.bookService = bookService; // Hacemos que el servicio esté disponible en las solicitudes
  next(); // Pasamos al siguiente middleware o ruta
});

// Ruta para obtener todos los libros
router.get("/", async (req, res, next) => {
  try {
    // Usamos el servicio de libros desde la solicitud para obtener todos los libros
    const books = await req.bookService.getAllBooks();
    // Enviamos la respuesta con los libros obtenidos
    res.json(books);
  } catch (error) {
    // Si hay un error, lo pasamos al siguiente middleware de manejo de errores
    next(error);
  }
});

// Ruta para obtener un libro por su ID
router.get("/:id", async (req, res, next) => {
  // Obtenemos el ID del libro de los parámetros de la ruta
  const bookId = req.params.id;
  try {
    // Usamos el servicio de libros desde la solicitud para obtener el libro por su ID
    const book = await req.bookService.getBookById(bookId);
    // Si el libro no existe, enviamos un error 404
    if (!book) {
      res.status(404).json({ message: "Libro no encontrado" });
      return;
    }
    // Enviamos la respuesta con el libro obtenido
    res.json(book);
  } catch (error) {
    // Si hay un error, lo pasamos al siguiente middleware de manejo de errores
    next(error);
  }
});

// Ruta para crear un nuevo libro
router.post("/", async (req, res, next) => {
  // Obtenemos los datos del libro del cuerpo de la solicitud
  const { titulo, autor, edicion } = req.body;
  try {
    // Usamos el servicio de libros desde la solicitud para crear un nuevo libro
    const newBookId = await req.bookService.createBook(titulo, autor, edicion);
    // Enviamos la respuesta con el ID del nuevo libro y un mensaje de éxito
    res.status(201).json({ id: newBookId, message: "Libro creado correctamente" });
  } catch (error) {
    // Si hay un error, lo pasamos al siguiente middleware de manejo de errores
    next(error);
  }
});

// Ruta para actualizar un libro existente
router.put("/:id", async (req, res, next) => {
  // Obtenemos el ID del libro de los parámetros de la ruta
  const bookId = req.params.id;
  // Obtenemos los datos actualizados del libro del cuerpo de la solicitud
  const { titulo, autor, edicion } = req.body;
  try {
    // Usamos el servicio de libros desde la solicitud para actualizar el libro
    const success = await req.bookService.updateBook(bookId, titulo, autor, edicion);
    // Si el libro no existe, enviamos un error 404
    if (!success) {
      res.status(404).json({ message: "Libro no encontrado" });
      return;
    }
    // Enviamos la respuesta con un mensaje de éxito
    res.json({ message: "Libro actualizado correctamente" });
  } catch (error) {
    // Si hay un error, lo pasamos al siguiente middleware de manejo de errores
    next(error);
  }
});

// Ruta para eliminar un libro por su ID
router.delete("/:id", async (req, res, next) => {
  // Obtenemos el ID del libro de los parámetros de la ruta
  const bookId = req.params.id;
  try {
    // Usamos el servicio de libros desde la solicitud para eliminar el libro
    const success = await req.bookService.deleteBook(bookId);
    // Si el libro no existe, enviamos un error 404
    if (!success) {
      res.status(404).json({ message: "Libro no encontrado" });
      return;
    }
    // Enviamos la respuesta con un mensaje de éxito
    res.json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    // Si hay un error, lo pasamos al siguiente middleware de manejo de errores
    next(error);
  }
});

// Exportamos el router para que pueda ser utilizado en otros archivos
module.exports = router;
