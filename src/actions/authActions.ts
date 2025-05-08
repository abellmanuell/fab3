"use server";
import { createUser, findUser, findUserById } from "lib/db/userDB";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import {
  FormState,
  LoginFormSchema,
  SignupFormSchema,
} from "@/lib/authDefinitions";
import { createSession, deleteSession } from "@/lib/session";

/************************************************
 *
 *            SIGNUP SERVER ACTION
 *
 ***********************************************/

export async function signUpAuth(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    nickname: formData.get("nickname"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Prepare data for insertion into database
  const { email, password, nickname } = validatedFields.data;

  // Check if user exist
  const existUser = await findUser(email);

  if (existUser) {
    return {
      message: "Email address is already taken!",
    };
  }

  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the user into the database
  const { insertedId: id } = await createUser({
    created_at: Date.now(),
    updated_at: Date.now(),
    nickname,
    email,
    password: hashedPassword,
  });

  // Find user by id
  const userData = await findUserById(id);

  if (!userData) {
    throw new Error("User not found after creation.");
  }

  const { _id } = userData;

  // Create user session
  await createSession(_id);
  // Redirect user to airdrops
  redirect("/airdrops?success=true&message=Successfully created!");
}

/************************************************
 *
 *            LOGIN SERVER ACTION
 *
 ***********************************************/

export async function loginAuth(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Prepare data for insertion into database
  const { email, password } = validatedFields.data;
  const userData = await findUser(email);

  if (!userData) {
    return {
      message: "Account not found.",
    };
  }

  // Check for password match
  const matchedPassword = await bcrypt.compare(password, userData?.password);

  if (!matchedPassword) {
    return {
      message: "Password is incorrect.",
    };
  }

  await createSession(userData?._id);

  // Redirect
  redirect("/airdrops?success=true&message=Successfully login!");
}

export async function logout() {
  deleteSession();
  redirect("/login?success=false&message=You are logged out");
}
