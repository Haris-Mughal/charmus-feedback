import { z } from "zod";

export const SignUpSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});
