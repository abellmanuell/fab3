"use server";
import { EditUserFormSchema, FormState } from "@/lib/db/editUserDefinition";
import { updateUser } from "@/lib/db/userDB";
import { revalidatePath } from "next/cache";

export async function updateUserDataAction(
  state: FormState,
  formData: FormData
) {
  const validatedFields = EditUserFormSchema.safeParse({
    userId: formData.get("userId"),
    nickname: formData.get("nickname"),
    email: formData.get("email"),
  });

  console.log(validatedFields.error?.issues);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Prepare data for insertion into database
  const { nickname, userId } = validatedFields.data;

  await updateUser(userId, {
    nickname,
  });

  revalidatePath("/settings/account-information");
  return {
    message: "Successfully saved!",
  };
}
