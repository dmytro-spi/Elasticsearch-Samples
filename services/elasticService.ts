import elasticClient from "../elasticClient";
import Book from "../models/book";

export const indexBooks = async (books: Book[]) => {
  for (const book of books) {
    await elasticClient.index({
      index: "books",
      id: book.isbn,
      body: book,
    });
  }
}

export const searchBooks = async (query: string) => {
  const searchResponse = await elasticClient.search({
    index: "books",
    body: {
      query: {
        match: {
          description: query,
        },
      },
    },
  });
  return searchResponse.hits.hits;
}

export const multiMatchSearch = async (query: string) => {
  const searchResponse = await elasticClient.search({
    index: "books",
    body: {
      query: {
        multi_match: {
          query: query,
          fields: ["title", "description"],
        },
      },
    },
  });
  return searchResponse.hits.hits;
}

export const searchBooksByIsbn = async (isbn: string[] | string) => {
  const searchResponse = await elasticClient.search({
    index: "books",
    body: {
      query: {
        ids: {
          values: typeof isbn === "string" ? [isbn] : isbn,
        },
      },
    },
  });
  return searchResponse.hits.hits;
}

export const searchBooksRegex = async (query: string) => {
  const searchResponse = await elasticClient.search({
    index: "books",
    body: {
      query: {
        regexp: {
          title: {
            value: query,
            flags: "ALL",
            case_insensitive: true,
          },
        },
      },
    },
  });
  return searchResponse.hits.hits;
}

export const searchBooksByPrice = async (from: number, to: number) => {
  const searchResponse = await elasticClient.search({
    index: "books",
    body: {
      query: {
        range: {
          price: {
            gte: from,
            lte: to,
          }
        },
      },
    },
  });
  return searchResponse.hits.hits;
}

export const searchBooksByAuthorAndDescription = async (author: string, description: string) => {
  const searchResponse = await elasticClient.search({
    index: "books",
    body: {
      query: {
        bool: {
          must: {
            match: {
              description: description,
            }
          },
          filter: {
            match: {
              author: author,
            }
          }
        },
      },
    },
  });
  return searchResponse.hits.hits;
}

export const searchBooksByDescriptionAndPrice = async (description: string, from: number, to: number) => {
  const searchResponse = await elasticClient.search({
    index: "books",
    body: {
      query: {
        bool: {
          must: {
            match: {
              description: description,
            }
          },
          filter: {
            range: {
              price: {
                gte: from,
                lte: to,
              }
            }
          }
        },
      },
    },
  });
  return searchResponse.hits.hits;
}

export const searchBooksPaginated = async (from: number, size: number, description: string) => {
  const searchResponse = await elasticClient.search({
    index: "books",
    body: {
      query: {
        match: {
          description: description,
        },
      },
      from: from,
      size: size,
    },
  });
  return searchResponse.hits.hits;
}
