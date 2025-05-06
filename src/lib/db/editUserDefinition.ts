import { z } from "zod";

export const EditUserFormSchema = z.object({
  nickname: z.string().trim().nonempty(),
  userId: z.string().trim().nonempty(),
  email: z.string().trim().nonempty(),
});

export type FormState =
  | {
      errors?: {
        nickname?: string[];
        userId?: string[];
        email?: string[];
      };
      message?: string;
    }
  | undefined;
