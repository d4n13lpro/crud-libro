const express = require("express");
const router = express.Router();
const BookService = require("../services/books.service");

// Middleware para pasar la conexión a la base de datos a todas las solicitudes
router.use((req, res, next) => {
  // Asumiendo que req.db contiene la conexión a la base de datos
  const bookService = new BookService(req.db);
  req.bookService = bookService; // Hacemos que el servicio esté disponible en las solicitudes
  next();
});

// Ruta para obtener todos los libros
router.get("/", async (req, res, next) => {
  try {
    const books = await req.bookService.getAllBooks(); // Usamos el servicio de libros desde la solicitud
    res.json(books);
  } catch (error) {
    next(error);
  }
});


// Ruta para obtener un libro por su ID
router.get("/:id", async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const book = await req.bookService.getBookById(bookId);
    if (!book) {
      res.status(404).json({ message: "Libro no encontrado" });
      return;
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
});

// Ruta para crear un nuevo libro
router.post("/", async (req, res, next) => {
  const { titulo, autor, edicion } = req.body;
  try {
    const newBookId = await req.bookService.createBook(titulo, autor, edicion);
    res.status(201).json({ id: newBookId, message: "Libro creado correctamente" });
  } catch (error) {
    next(error);
  }
});

// Ruta para actualizar un libro existente
router.put("/:id", async (req, res, next) => {
  const bookId = req.params.id;
  const { titulo, autor, edicion } = req.body;
  try {
    const success = await req.bookService.updateBook(bookId, titulo, autor, edicion);
    if (!success) {
      res.status(404).json({ message: "Libro no encontrado" });
      return;
    }
    res.json({ message: "Libro actualizado correctamente" });
  } catch (error) {
    next(error);
  }
});

// Ruta para eliminar un libro por su ID
router.delete("/:id", async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const success = await req.bookService.deleteBook(bookId);
    if (!success) {
      res.status(404).json({ message: "Libro no encontrado" });
      return;
    }
    res.json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
