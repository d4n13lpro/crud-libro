// Definimos la clase Book
class Book {
  // El constructor se llama cuando creamos una nueva instancia de la clase
  constructor(title, author, edition) {
    // Inicializamos las propiedades del libro
    this.title = title;    // Título del libro
    this.author = author;  // Autor del libro
    this.edition = edition;// Edición del libro
  }

  // Método para obtener una representación en formato JSON del libro
  toJSON() {
    // Devuelve un objeto con las propiedades del libro
    return {
      title: this.title,
      author: this.author,
      edition: this.edition
    };
  }
}

// Exportamos la clase Book para que pueda ser utilizada en otros archivos
module.exports = Book;
