import * as z from "zod";

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: "Please enter a title.",
  }),
  content: z.string().min(1, {
    message: "Please enter content.",
  }),
  due_date: z.string().min(1, {
    message: "Please enter a due date.",
  }),
});
