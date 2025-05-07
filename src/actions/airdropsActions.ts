"use server";
import { findUserById } from "@/lib/db/userDB";
import { AirdropFormSchema, FormState } from "@/lib/airdropDefinitions";
import { createAirdrop, updateAirdrop } from "@/lib/db/airdropDB";
import { redirect } from "next/navigation";
import { EditAirdropFormSchema } from "@/lib/db/editAirdropDefinition";
import { revalidatePath } from "next/cache";

/************************************************
 *
 *        ADD AIRDROP SERVER ACTION
 *
 ***********************************************/
export async function addAirdropAction(state: FormState, formData: FormData) {
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
  await createAirdrop({
    airdropLink,
    claimDate,
    userId,
  });

  redirect("/airdrops");
}

export async function updateAirdropAction(
  state: FormState,
  formData: FormData
) {
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

  await updateAirdrop(_id, userId, {
    airdropLink,
    claimDate,
  });

  revalidatePath("/airdrops/[airdrop]/edit");

  return {
    message: "Successfully modified",
  };
}
