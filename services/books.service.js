// Definimos la clase BookService
class BookService {
  // El constructor se llama cuando creamos una nueva instancia de la clase
  constructor(db) {
    // Inicializamos la propiedad db con la conexión a la base de datos
    this.db = db;
  }

  // Método para obtener todos los libros
  async getAllBooks() {
    // Creamos una nueva promesa
    return new Promise((resolve, reject) => {
      // Ejecutamos una consulta SQL para obtener todos los libros
      this.db.query("SELECT * FROM books", (err, results) => {
        // Si hay un error, rechazamos la promesa
        if (err) {
          reject(err);
          return;
        }
        // Si no hay errores, resolvemos la promesa con los resultados de la consulta
        resolve(results);
      });
    });
  }

  // Método para obtener un libro por su ID
  async getBookById(bookId) {
    // Creamos una nueva promesa
    return new Promise((resolve, reject) => {
      // Ejecutamos una consulta SQL para obtener el libro con el ID especificado
      this.db.query("SELECT * FROM books WHERE id = ?", [bookId], (err, results) => {
        // Si hay un error, rechazamos la promesa
        if (err) {
          reject(err);
          return;
        }
        // Si no hay resultados, resolvemos la promesa con null
        if (results.length === 0) {
          resolve(null);
          return;
        }
        // Si hay resultados, resolvemos la promesa con el primer resultado
        resolve(results[0]);
      });
    });
  }

  // Método para crear un nuevo libro
  async createBook(title, author, edition) {
    // Creamos una nueva promesa
    return new Promise((resolve, reject) => {
      // Ejecutamos una consulta SQL para insertar un nuevo libro con los datos especificados
      this.db.query("INSERT INTO books (titulo, autor, edicion) VALUES (?, ?, ?)", [title, author, edition], (err, result) => {
        // Si hay un error, rechazamos la promesa
        if (err) {
          reject(err);
          return;
        }
        // Si no hay errores, resolvemos la promesa con el ID del nuevo libro
        resolve(result.insertId);
      });
    });
  }

  // Método para actualizar un libro existente
  async updateBook(bookId, title, author, edition) {
    // Creamos una nueva promesa
    return new Promise((resolve, reject) => {
      // Ejecutamos una consulta SQL para actualizar el libro con el ID especificado
      this.db.query("UPDATE books SET titulo = ?, autor = ?, edicion = ? WHERE id = ?", [title, author, edition, bookId], (err, result) => {
        // Si hay un error, rechazamos la promesa
        if (err) {
          reject(err);
          return;
        }
        // Si no hay errores, resolvemos la promesa con un booleano que indica si se actualizó algún libro
        resolve(result.affectedRows > 0);
      });
    });
  }

  // Método para eliminar un libro por su ID
  async deleteBook(bookId) {
    // Creamos una nueva promesa
    return new Promise((resolve, reject) => {
      // Ejecutamos una consulta SQL para eliminar el libro con el ID especificado
      this.db.query("DELETE FROM books WHERE id = ?", [bookId], (err, result) => {
        // Si hay un error, rechazamos la promesa
        if (err) {
          reject(err);
          return;
        }
        // Si no hay errores, resolvemos la promesa con un booleano que indica si se eliminó algún libro
        resolve(result.affectedRows > 0);
      });
    });
  }
}

// Exportamos la clase BookService para que pueda ser utilizada en otros archivos
module.exports = BookService;
