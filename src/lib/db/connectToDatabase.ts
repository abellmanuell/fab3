import { MongoClient } from "mongodb";
import "dotenv/config";

const mongodbUrl = process.env.MONGODB_URL as string;
const client = new MongoClient(mongodbUrl);

// Database Name
const dbName = "fab3";

export default async function connectToDatabase() {
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to database server");
    const db = client.db(dbName);

    return db;
  } catch {
    console.error("Unable to connect to database server");
  }
}
