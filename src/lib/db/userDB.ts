import connectToDatabase from "./connectToDatabase";
import { v7 as uuidv7 } from "uuid";

/* DATABASE USER COLLECTION FUNCTION */
export async function dbCollection(name: string) {
  const db = await connectToDatabase();
  if (!db) {
    throw new Error("Failed to connect to the database.");
  }
  const user = await db.collection(name);
  return user;
}

/************************
 * CREATE USER
 * **********************/
export async function createUser(data: object) {
  const collection = await dbCollection("users");
  return await collection.insertOne({ _id: uuidv7(), ...data });
}

/************************
 * FIND A USER
 * **********************/
export async function findUser(email: string) {
  const collection = await dbCollection("users");
  return await collection.findOne({ email });
}

/************************
 * FIND A USER BY ID
 * **********************/
export async function findUserById(_id: any) {
  const collection = await dbCollection("users");
  return await collection.findOne({ _id });
}

/************************
 * UPDATE A USER
 * **********************/
export async function updateUser(_id: any, data: any) {
  const collection = await dbCollection("users");
  const updated_at = Date.now();
  return await collection.updateOne({ _id }, { $set: { updated_at, ...data } });
}
