"use server";
import { z } from "zod";
import { findUser } from "lib/db/userDB";
import { ServerResponse } from "lib/ServerResponse";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { signToken } from "../lib/jwt/jwtToken";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const cookieStore = await cookies();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (![email, password].every(Boolean)) {
    return ServerResponse({
      status: false,
      message: "You haven't enter your email and password.",
    });
  }

  /***********************************************
   * ZOD VALIDATION
   * Validate all the input data with Zod Schema
   ***********************************************/
  const User = z.object({
    email: z.string().email({ message: "Invalid email address" }).nonempty(),
    password: z.string().nonempty(),
  });

  const user = User.safeParse({ email, password });

  if (user.error && user.error.issues?.length > 0) {
    return ServerResponse({
      status: false,
      message: user.error?.issues[0].message,
    });
  }
  /************ END VALIDATION *******************/

  if (!user.data) {
    return ServerResponse({
      status: false,
      message: "Validation failed. User data is missing.",
    });
  }

  /* Check if user exist */
  const existUser = await findUser(user.data.email);
  let matchedPassword;

  if (existUser) {
    matchedPassword = bcrypt.compareSync(
      user.data.password,
      existUser?.password
    );
  }

  /* Sign & Set Cookie */
  const { success, access_token, message } = await signToken({ ...existUser });

  if (!success && !access_token) {
    console.log(message);
  }

  matchedPassword &&
    access_token &&
    cookieStore.set("access_token", access_token);

  redirect("/airdrops?success=true&message=Successfully login!");
}
