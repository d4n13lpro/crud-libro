class Book {
  constructor(title, author, edition) {
    this.title = title;
    this.author = author;
    this.edition = edition;
  }

  // Método para obtener una representación en formato JSON del libro
  toJSON() {
    return {
      title: this.title,
      author: this.author,
      edition: this.edition
    };
  }
}

module.exports = Book;