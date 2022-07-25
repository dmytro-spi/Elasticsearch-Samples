import Book from "../models/book";

const books = [
  new Book(
    "The Lord of the Rings",
    "J.R.R. Tolkien",
    "0-395-19395-8",
    `The Lord of the Rings is an epic high-fantasy novel written by English author
      J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit,
      but eventually developed into a much larger work. It is one of the best-selling novels ever written,
      with over 150 million copies sold.`,
    12.99,
  ),
  new Book(
    "The Hobbit",
    "J.R.R. Tolkien",
    "0-395-19395-9",
    `The Hobbit, or There and Back Again, is a children's fantasy novel
      by English author J. R. R. Tolkien. It is the first of three planned novels to
      be published in the English canon, following The Two Towers and The Return of the King.`,
    8.99,
  ),
  new Book(
    "Harry Potter and the Philosopher's Stone",
    "J.K. Rowling",
    "0-7475-3100-9",
    `Harry Potter and the Philosopher's Stone is a fantasy novel written by
      British author J. K. Rowling. The plot follows Harry Potter, a young wizard who discovers
      his magical heritage as he makes his way through the school of wizardry at Hogwarts School
      of Witchcraft and Wizardry.`,
    20.99,
  ),
];

export default books;
