"use server";

import { dbCollection } from "./userDB";
import { v7 as uuidv7 } from "uuid";

/************************
 * CREATE AN AIRDROP
 * **********************/
export async function createAirdrop(data: object) {
  const collection = await dbCollection("airdrops");
  return await collection.insertOne({ _id: uuidv7(), ...data } as any);
}

/************************
 * FIND AIRDROPS
 * **********************/
export async function findAirdrops(userId: any) {
  const collection = await dbCollection("airdrops");
  return await collection.find({ userId } as any).toArray();
}

/************************
 * FIND AN AIRDROP
 * **********************/
export async function findAirdrop(_id: string) {
  const collection = await dbCollection("airdrops");
  return await collection.findOne({ _id } as any);
}

/************************
 * FIND AN AIRDROP
 * **********************/
export async function deleteAirdrop(_id: string, userId: string) {
  const collection = await dbCollection("airdrops");
  return await collection.deleteOne({ $and: [{ _id }, { userId }] } as any);
}

/************************
 * FIND AN AIRDROP
 * **********************/
export async function updateAirdrop(_id: string, userId: string, data: any) {
  const collection = await dbCollection("airdrops");
  return await collection.updateOne(
    { $and: [{ _id }, { userId }] } as any,
    {
      $set: { ...data },
    } as any
  );
}
