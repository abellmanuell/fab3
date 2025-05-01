"use server";
import { findUserById } from "@/lib/db/userDB";
import { AirdropFormSchema, FormState } from "@/lib/airdropDefinitions";
import { createAirdrop, updateAirdrop } from "@/lib/db/airdropDB";
import { redirect } from "next/navigation";
import { EditAirdropFormSchema } from "@/lib/db/editAirdropDefinition";

/************************************************
 *
 *        ADD AIRDROP SERVER ACTION
 *
 ***********************************************/
export async function addAirdrop(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = AirdropFormSchema.safeParse({
    userId: formData.get("userId"),
    airdropLink: formData.get("airdrop_link"),
    claimDate: formData.get("claim_date"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Prepare data for insertion into database
  const { airdropLink, claimDate, userId } = validatedFields.data;

  // Check if user exist
  const existUser = await findUserById(userId);
  if (!existUser) {
    return {
      message: "User do not exist!",
    };
  }

  // Create an airdrop
  const { insertedId: airdropId } = await createAirdrop({
    airdropLink,
    claimDate,
    userId,
  });

  /*   if (airdropId) {
    return {
      message: "Successfully added!",
    };
  } */

  airdropId && redirect("/airdrops");
}

export async function editAirdrop(state: FormState, formData: FormData) {
  const validatedFields = EditAirdropFormSchema.safeParse({
    userId: formData.get("userId"),
    _id: formData.get("_id"),
    airdropLink: formData.get("airdrop_link"),
    claimDate: formData.get("claim_date"),
  });
  console.log(validatedFields.error?.issues);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Prepare data for insertion into database
  const { airdropLink, claimDate, userId, _id } = validatedFields.data;

  const { acknowledged } = await updateAirdrop(_id, userId, {
    airdropLink,
    claimDate,
  });

  return {
    message: "Successfully modified",
  };
}
