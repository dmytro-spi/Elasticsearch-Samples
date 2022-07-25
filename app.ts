import "dotenv/config";
import elasticClient from "./elasticClient";
import {
  indexBooks,
  multiMatchSearch,
  searchBooks,
  searchBooksByIsbn,
  searchBooksRegex,
  searchBooksByPrice,
  searchBooksByAuthorAndDescription,
  searchBooksByDescriptionAndPrice,
  searchBooksPaginated,
} from "./services/elasticService";
import books from "./data/books";

const runApp = async () => {
  // index books
  await indexBooks(books);

  // search books (match query)
  let hits = await searchBooks("fantasy");
  console.log("Books found (match):", hits);

  // search books (multi match query)
  hits = await multiMatchSearch("Hobbit");
  console.log("Books found (multi match):", hits);

  // search books (term level query)
  hits = await searchBooksByIsbn(books.slice(0, 2).map((book) => book.isbn));
  console.log("Books found (term level - ids):", hits);
  hits = await searchBooksRegex("har*y");
  console.log("Books found (term level - regex):", hits);
  hits = await searchBooksByPrice(10, 20);
  console.log("Books found (term level - price):", hits);

  // compound queries
  hits = await searchBooksByAuthorAndDescription("J.R.R. Tolkien", "fantasy");
  console.log("Books found (compound query):", hits);

  // aggregations
  const result = await elasticClient.search({
    index: "books",
    body: {
      query: {
        match: {
          description: "fantasy",
        }
      },
      aggs: {
        authors: {
          terms: {
            field: "price",
            size: 10,
          },
        },
      },
    },
  });
  console.log("Aggregation", result);

  // filters
  hits = await searchBooksByDescriptionAndPrice("fantasy", 10, 20);
  console.log("Books found (filters):", hits);

  // paginated search
  hits = await searchBooksPaginated(1, 2, "fantasy");
  console.log("Books found (paginated):", hits);

  // update book
  const book = books[0];
  book.title = "The Lord of the Rings 2";
  await elasticClient.update({
    index: "books",
    id: book.isbn,
    body: {
      doc: book,
    }
  });
  hits = await searchBooksByIsbn(book.isbn);
  console.log("Book updated:", hits);
}

runApp().then(() => {
  console.log("All done, baby!");
}).catch(err => {
  console.error(err);
});
