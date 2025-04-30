import { dbCollection } from "./userDB";
import { v7 as uuidv7 } from "uuid";

/************************
 * CREATE AN AIRDROP
 * **********************/
export async function createAirdrop(data: object) {
  const collection = await dbCollection("airdrops");
  return await collection.insertOne({ _id: uuidv7(), ...data });
}

/************************
 * FIND AIRDROPS
 * **********************/
export async function findAirdrops() {
  const collection = await dbCollection("airdrops");
  return await collection.find({}).toArray();
}

/************************
 * FIND AN AIRDROP
 * **********************/
export async function findAirdrop(_id: string) {
  const collection = await dbCollection("airdrops");
  return await collection.findOne({ _id });
}
