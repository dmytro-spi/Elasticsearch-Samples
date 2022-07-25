"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const elasticClient_1 = __importDefault(require("./elasticClient"));
const elasticService_1 = require("./services/elasticService");
const books_1 = __importDefault(require("./data/books"));
const runApp = () => __awaiter(void 0, void 0, void 0, function* () {
    // index books
    yield (0, elasticService_1.indexBooks)(books_1.default);
    // search books (match query)
    let hits = yield (0, elasticService_1.searchBooks)("fantasy");
    console.log("Books found (match):", hits);
    // search books (multi match query)
    hits = yield (0, elasticService_1.multiMatchSearch)("Hobbit");
    console.log("Books found (multi match):", hits);
    // search books (term level query)
    hits = yield (0, elasticService_1.searchBooksByIsbn)(books_1.default.slice(0, 2).map((book) => book.isbn));
    console.log("Books found (term level - ids):", hits);
    hits = yield (0, elasticService_1.searchBooksRegex)("har*y");
    console.log("Books found (term level - regex):", hits);
    hits = yield (0, elasticService_1.searchBooksByPrice)(10, 20);
    console.log("Books found (term level - price):", hits);
    // compound queries
    hits = yield (0, elasticService_1.searchBooksByAuthorAndDescription)("J.R.R. Tolkien", "fantasy");
    console.log("Books found (compound query):", hits);
    // aggregations
    const result = yield elasticClient_1.default.search({
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
    hits = yield (0, elasticService_1.searchBooksByDescriptionAndPrice)("fantasy", 10, 20);
    console.log("Books found (filters):", hits);
    // paginated search
    hits = yield (0, elasticService_1.searchBooksPaginated)(1, 2, "fantasy");
    console.log("Books found (paginated):", hits);
    // update book
    const book = books_1.default[0];
    book.title = "The Lord of the Rings 2";
    yield elasticClient_1.default.update({
        index: "books",
        id: book.isbn,
        body: {
            doc: book,
        }
    });
    hits = yield (0, elasticService_1.searchBooksByIsbn)(book.isbn);
    console.log("Book updated:", hits);
});
runApp().then(() => {
    console.log("All done, baby!");
}).catch(err => {
    console.error(err);
});
//# sourceMappingURL=app.js.map