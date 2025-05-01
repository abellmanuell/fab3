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

export async function signup(state: FormState, formData: FormData) {
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
  const user = await findUserById(id);

  // Create user session
  await createSession(user?._id);
  // Redirect user
  redirect("/airdrops?success=true&message=Successfully created!");
}

/************************************************
 *
 *            LOGIN SERVER ACTION
 *
 ***********************************************/

export async function login(state: FormState, formData: FormData) {
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
  const user = await findUser(email);

  if (!user) {
    return {
      message: "Account not found.",
    };
  }

  // Check for password match
  const matchedPassword = await bcrypt.compare(password, user?.password);

  if (!matchedPassword) {
    return {
      message: "Password is incorrect.",
    };
  }

  matchedPassword && (await createSession(user?._id));

  // Redirect
  redirect("/airdrops?success=true&message=Successfully login!");
}

export async function logout() {
  deleteSession();
  redirect("/login?success=false&message=You are logged out");
}
