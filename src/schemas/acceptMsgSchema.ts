import { z } from "zod";

export const acceptMsgSchema = z.object({
  acceptMessage: z.boolean(),
});
