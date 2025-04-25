"use server";
import { z } from "zod";

export async function createUser(formData: FormData) {
  const nickname = formData.get("nickname");
  const email = formData.get("email");
  const password = formData.get("password");

  /* Regular expression to detect HTML and script */
  const noHTMLRegex = /<\/?[\w\s="/.':;#-\/\?]+>/gi;

  /* Zod Schema */
  const User = z
    .object({
      nickname: z
        .string({
          required_error: "Nickname is required",
        })
        .trim()
        .min(3)
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
        .min(8)
        .nonempty(),
    })
    .required()
    .refine((val) => !noHTMLRegex.test(val.nickname), {
      message: "HTML tags or scripts are not allowed in nickname",
    })
    .refine((val) => !noHTMLRegex.test(val.email), {
      message: "HTML tags or scripts are not allowed in email",
    })
    .refine((val) => !noHTMLRegex.test(val.password), {
      message: "HTML tags or scripts are not allowed in password",
    });

  const user = User.safeParse({ nickname, email, password });

  /* Attend to this later */
  /* if (user.error?.issues?.length ?? 0 > 0) {
    console.log(user.error?.issues)
  } */

  if (![nickname, email, password].every(Boolean)) {
    return { status: false, message: "Please fill in all fields!" };
  }

  return { status: true, message: "Registered successfully!" };
}
