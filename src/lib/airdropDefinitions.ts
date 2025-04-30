import { z } from "zod";

export const AirdropFormSchema = z.object({
  airdropLink: z.string().trim().url({ message: "Invalid link" }),
  userId: z.string().trim().nonempty(),
  claimDate: z.string().date().trim(),
});

export type FormState =
  | {
      errors?: {
        airdropLink?: string[];
        claimDate?: string[];
        userId?: string[];
      };
      message?: string;
    }
  | undefined;
