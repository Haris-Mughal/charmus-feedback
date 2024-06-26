import { z } from "zod";

export const SignInSchema = z.object({
  identifier: z.string(), // because it holds both email and username
  password: z.string(),
});
