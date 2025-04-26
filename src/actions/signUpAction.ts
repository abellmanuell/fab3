"use server";
import { z } from "zod";
import { createUser, findUser } from "lib/db/userDB";
import { ServerResponse } from "lib/ServerResponse";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { signToken } from "../lib/jwt/jwtToken";
import { redirect } from "next/navigation";

export async function signUpAction(formData: FormData) {
  const cookieStore = await cookies();

  const nickname = formData.get("nickname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (![nickname, email, password].every(Boolean)) {
    return ServerResponse({
      status: false,
      message: "Please fill in all fields",
    });
  }

  /***********************************************
   * ZOD VALIDATION
   * Validate all the input data with Zod Schema
   ***********************************************/
  const User = z.object({
    nickname: z
      .string()
      .nonempty()
      .min(4, { message: "Must be 4 or more characters long" }),
    email: z.string().email({ message: "Invalid email address" }).nonempty(),
    password: z.string().nonempty().min(8, {
      message:
        "Password must be at least 8 characters long and contain at least one letter and one number.",
    }),
  });

  const user = User.safeParse({ nickname, email, password });

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

  if (existUser) {
    return ServerResponse({
      status: false,
      message: "Email address is already taken!",
    });
  }

  /* Hash Password */
  const hashPassword = bcrypt.hashSync(user.data.password, 10);

  const { acknowledged } = await createUser(
    user.data.nickname,
    user.data.email,
    hashPassword
  );

  /* Sign & Set Cookie */
  const { success, access_token, message } = await signToken(user.data);

  if (!success && !access_token) {
    console.log(message);
  }

  acknowledged && access_token && cookieStore.set("access_token", access_token);

  redirect("/airdrops?success=true&message=Successfully created!");
}
