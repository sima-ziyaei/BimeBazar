import { isValidNationalCode } from "@/functions/NationalCodeValidation";
import { z } from "zod";

export const formSchema = z.object({
  nationalId: z
    .string()
    .min(10, "national-code-limitation")
    .max(10, "national-code-limitation")
    .regex(/^\d{10}$/, "national-code-limitation")
    .refine((value) => isValidNationalCode(value), {
      message: "national-code-limitation",
    }),
  phoneNumber: z
    .string()
    .min(10, "phone-number-limitation")
    .max(11, "phone-number-limitation")
    .or(z.string().length(11, "phone-number-limitation"))
    .refine((value) => {
      return /^(09\d{9})$/.test(value) || /^[9]\d{9}$/.test(value);
    }, "phone-number-limitation"),
    addressId: z.object({}).required()
});

export type formData = z.infer<typeof formSchema>;
