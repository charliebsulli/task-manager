import { MongoClient } from "mongodb";

const uri = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1";
export const client = new MongoClient(uri);

const databaseName = process.env.DB_NAME || "test";
const database = client.db(databaseName);

export default database;
