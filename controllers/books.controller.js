// Importamos el servicio de libros
const BookService = require("../services/books.service");

// Definimos la clase BooksController
class BooksController {
  // En el constructor, creamos una nueva instancia de BookService
  constructor() {
    this.bookService = new BookService();
  }

  // Método para obtener todos los libros
  async getAllBooks(req, res, next) {
    try {
      // Usamos el método getAllBooks del servicio de libros
      const books = await this.bookService.getAllBooks();
      // Enviamos la respuesta con los libros obtenidos
      res.json(books);
    } catch (error) {
      // Si hay un error, lo pasamos al siguiente middleware
      next(error);
    }
  }

  // Método para obtener un libro por su ID
  async getBookById(req, res, next) {
    // Obtenemos el ID del libro de los parámetros de la ruta
    const bookId = req.params.id;
    try {
      // Usamos el método getBookById del servicio de libros
      const book = await this.bookService.getBookById(bookId);
      // Si el libro no existe, enviamos un error 404
      if (!book) {
        res.status(404).json({ message: "Libro no encontrado" });
        return;
      }
      // Enviamos la respuesta con el libro obtenido
      res.json(book);
    } catch (error) {
      // Si hay un error, lo pasamos al siguiente middleware
      next(error);
    }
  }

  // Método para crear un nuevo libro
  async createBook(req, res, next) {
    // Obtenemos los datos del libro del cuerpo de la solicitud
    const { titulo, autor, edicion } = req.body;
    try {
      // Usamos el método createBook del servicio de libros
      const newBookId = await this.bookService.createBook(titulo, autor, edicion);
      // Enviamos la respuesta con el ID del nuevo libro y un mensaje de éxito
      res.status(201).json({ id: newBookId, message: "Libro creado correctamente" });
    } catch (error) {
      // Si hay un error, lo pasamos al siguiente middleware
      next(error);
    }
  }

  // Método para actualizar un libro
  async updateBook(req, res, next) {
    // Obtenemos el ID del libro de los parámetros de la ruta
    const bookId = req.params.id;
    // Obtenemos los datos actualizados del libro del cuerpo de la solicitud
    const { titulo, autor, edicion } = req.body;
    try {
      // Usamos el método updateBook del servicio de libros
      const success = await this.bookService.updateBook(bookId, titulo, autor, edicion);
      // Si el libro no existe, enviamos un error 404
      if (!success) {
        res.status(404).json({ message: "Libro no encontrado" });
        return;
      }
      // Enviamos la respuesta con un mensaje de éxito
      res.json({ message: "Libro actualizado correctamente" });
    } catch (error) {
      // Si hay un error, lo pasamos al siguiente middleware
      next(error);
    }
  }

  // Método para eliminar un libro
  async deleteBook(req, res, next) {
    // Obtenemos el ID del libro de los parámetros de la ruta
    const bookId = req.params.id;
    try {
      // Usamos el método deleteBook del servicio de libros
      const success = await this.bookService.deleteBook(bookId);
      // Si el libro no existe, enviamos un error 404
      if (!success) {
        res.status(404).json({ message: "Libro no encontrado" });
        return;
      }
      // Enviamos la respuesta con un mensaje de éxito
      res.json({ message: "Libro eliminado correctamente" });
    } catch (error) {
      // Si hay un error, lo pasamos al siguiente middleware
      next(error);
    }
  }
}

// Exportamos la clase BooksController
module.exports = BooksController;
