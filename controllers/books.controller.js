const BookService = require("../services/books.service");

class BooksController {
  constructor() {
    this.bookService = new BookService();
  }

  async getAllBooks(req, res, next) {
    try {
      const books = await this.bookService.getAllBooks();
      res.json(books);
    } catch (error) {
      next(error);
    }
  }

  async getBookById(req, res, next) {
    const bookId = req.params.id;
    try {
      const book = await this.bookService.getBookById(bookId);
      if (!book) {
        res.status(404).json({ message: "Libro no encontrado" });
        return;
      }
      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async createBook(req, res, next) {
    const { titulo, autor, edicion } = req.body;
    try {
      const newBookId = await this.bookService.createBook(titulo, autor, edicion);
      res.status(201).json({ id: newBookId, message: "Libro creado correctamente" });
    } catch (error) {
      next(error);
    }
  }

  async updateBook(req, res, next) {
    const bookId = req.params.id;
    const { titulo, autor, edicion } = req.body;
    try {
      const success = await this.bookService.updateBook(bookId, titulo, autor, edicion);
      if (!success) {
        res.status(404).json({ message: "Libro no encontrado" });
        return;
      }
      res.json({ message: "Libro actualizado correctamente" });
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req, res, next) {
    const bookId = req.params.id;
    try {
      const success = await this.bookService.deleteBook(bookId);
      if (!success) {
        res.status(404).json({ message: "Libro no encontrado" });
        return;
      }
      res.json({ message: "Libro eliminado correctamente" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BooksController;
