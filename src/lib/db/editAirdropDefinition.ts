import { z } from "zod";

export const EditAirdropFormSchema = z.object({
  airdropLink: z.string().trim().url({ message: "Invalid link" }),
  userId: z.string().trim().nonempty(),
  claimDate: z.string().date().trim(),
  _id: z.string().trim().nonempty(),
});

export type FormState =
  | {
      errors?: {
        airdropLink?: string[];
        claimDate?: string[];
        userId?: string[];
        _id: string[];
      };
      message?: string;
    }
  | undefined;
