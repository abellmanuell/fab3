import connectToDatabase from "./connectToDatabase";

/* DATABASE USER COLLECTION FUNCTION */
async function dbCollection(name: string) {
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
export async function createUser(
  nickname: string,
  email: string,
  password: string
) {
  const collection = await dbCollection("users");
  return await collection.insertOne({
    nickname,
    email,
    password,
  });
}

/************************
 * FIND A USER
 * **********************/
export async function findUser(email: string) {
  const collection = await dbCollection("users");
  return await collection.findOne({ email });
}
