class Book {
  constructor(
    public title: string,
    public author: string,
    public isbn: string,
    public description: string,
    public price: number,
  ) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.description = description;
    this.price = price;
  }
}

export default Book;
