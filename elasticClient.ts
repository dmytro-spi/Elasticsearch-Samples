import fs from 'fs';
import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: process.env.ELASTIC_URL,
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
    ca: fs.readFileSync("./certs/ca/ca.crt"),
  },
  maxRetries: 3,
  requestTimeout: 30000,
});

export default client;
