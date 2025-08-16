import { z } from "zod";

export const sessionSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  description: z.string().min(5, "Description is too short"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  type: z.string().min(3, "Type is too short"),
  backgroundMusic: z.string().optional(),
});
