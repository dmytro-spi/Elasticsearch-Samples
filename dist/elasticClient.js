"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const elasticsearch_1 = require("@elastic/elasticsearch");
const client = new elasticsearch_1.Client({
    node: process.env.ELASTIC_URL,
    auth: {
        username: process.env.ELASTIC_USER,
        password: process.env.ELASTIC_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
        ca: fs_1.default.readFileSync("./certs/ca/ca.crt"),
    },
    maxRetries: 3,
    requestTimeout: 30000,
});
exports.default = client;
//# sourceMappingURL=elasticClient.js.map