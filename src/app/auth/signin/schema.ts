import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type FormSignin = z.infer<typeof SignInSchema>;
