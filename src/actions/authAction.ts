"use server";
import { z } from "zod";

export async function createUser(formData: FormData) {
  const nickname = formData.get("nickname");
  const email = formData.get("email");
  const password = formData.get("password");

  /* Zod Schema */
  const User = z
    .object({
      nickname: z
        .string({
          required_error: "Nickname is required",
        })
        .trim()
        .nonempty(),
      email: z
        .string({
          required_error: "Email address is required",
        })
        .email()
        .trim()
        .nonempty(),
      password: z
        .string({
          required_error: "Password is required",
        })
        .nonempty(),
    })
    .required();

  const user = User.safeParse({ nickname, email, password });
  console.log(user);
  console.log(user.error?.issues);

  return { status: true, message: "Registered successfully!" };
}
