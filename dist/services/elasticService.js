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
exports.searchBooksPaginated = exports.searchBooksByDescriptionAndPrice = exports.searchBooksByAuthorAndDescription = exports.searchBooksByPrice = exports.searchBooksRegex = exports.searchBooksByIsbn = exports.multiMatchSearch = exports.searchBooks = exports.indexBooks = void 0;
const elasticClient_1 = __importDefault(require("../elasticClient"));
const indexBooks = (books) => __awaiter(void 0, void 0, void 0, function* () {
    for (const book of books) {
        yield elasticClient_1.default.index({
            index: "books",
            id: book.isbn,
            body: book,
        });
    }
});
exports.indexBooks = indexBooks;
const searchBooks = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchResponse = yield elasticClient_1.default.search({
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
});
exports.searchBooks = searchBooks;
const multiMatchSearch = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchResponse = yield elasticClient_1.default.search({
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
});
exports.multiMatchSearch = multiMatchSearch;
const searchBooksByIsbn = (isbn) => __awaiter(void 0, void 0, void 0, function* () {
    const searchResponse = yield elasticClient_1.default.search({
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
});
exports.searchBooksByIsbn = searchBooksByIsbn;
const searchBooksRegex = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchResponse = yield elasticClient_1.default.search({
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
});
exports.searchBooksRegex = searchBooksRegex;
const searchBooksByPrice = (from, to) => __awaiter(void 0, void 0, void 0, function* () {
    const searchResponse = yield elasticClient_1.default.search({
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
});
exports.searchBooksByPrice = searchBooksByPrice;
const searchBooksByAuthorAndDescription = (author, description) => __awaiter(void 0, void 0, void 0, function* () {
    const searchResponse = yield elasticClient_1.default.search({
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
});
exports.searchBooksByAuthorAndDescription = searchBooksByAuthorAndDescription;
const searchBooksByDescriptionAndPrice = (description, from, to) => __awaiter(void 0, void 0, void 0, function* () {
    const searchResponse = yield elasticClient_1.default.search({
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
});
exports.searchBooksByDescriptionAndPrice = searchBooksByDescriptionAndPrice;
const searchBooksPaginated = (from, size, description) => __awaiter(void 0, void 0, void 0, function* () {
    const searchResponse = yield elasticClient_1.default.search({
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
});
exports.searchBooksPaginated = searchBooksPaginated;
//# sourceMappingURL=elasticService.js.map