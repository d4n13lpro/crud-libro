class BookService {
  constructor(db) {
    this.db = db;
  }

  async getAllBooks() {
    return new Promise((resolve, reject) => {
      this.db.query("SELECT * FROM books", (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }

  async getBookById(bookId) {
    return new Promise((resolve, reject) => {
      this.db.query("SELECT * FROM books WHERE id = ?", [bookId], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        if (results.length === 0) {
          resolve(null);
          return;
        }
        resolve(results[0]);
      });
    });
  }

  async createBook(title, author, edition) {
    return new Promise((resolve, reject) => {
      this.db.query("INSERT INTO books (titulo, autor, edicion) VALUES (?, ?, ?)", [title, author, edition], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result.insertId);
      });
    });
  }

  async updateBook(bookId, title, author, edition) {
    return new Promise((resolve, reject) => {
      this.db.query("UPDATE books SET titulo = ?, autor = ?, edicion = ? WHERE id = ?", [title, author, edition, bookId], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result.affectedRows > 0);
      });
    });
  }

  async deleteBook(bookId) {
    return new Promise((resolve, reject) => {
      this.db.query("DELETE FROM books WHERE id = ?", [bookId], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result.affectedRows > 0);
      });
    });
  }
}

module.exports = BookService;
