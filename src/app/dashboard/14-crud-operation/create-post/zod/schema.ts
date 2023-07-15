import * as z from "zod";

export const CreatePostSchema = z.object({
  title: z
    .string()
    // .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be less than 200 characters" }),
  description: z.string(),
  // .min(15, { message: "description mustt be atleast 15 characters" }),
});

export type CreatePost = z.infer<typeof CreatePostSchema>;
