"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TodoSchema } from "./schema";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const CreateTodo = TodoSchema.omit({ id: true, data: true });
export type State = {
  message?: string | null;
  values?: {
    title?: string[];
    content?: string[];
    due_date?: string[];
  };
  errors?: {
    title?: string[];
    content?: string[];
    due_date?: string[];
  };
};

export async function createTodo(prevState: State, formData: FormData) {
  // Validate form using Zod
  console.log("formData", formData);
  const validatedFields = CreateTodo.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    due_date: formData.get("due_date"),
  });
  console.log("validatedFields", validatedFields);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Todo.",
    };
  }

  // Prepare data for insertion into the database
  const { title, content, due_date } = validatedFields.data;

  // Insert data into the database
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const user = await supabase.auth.getUser();
    await supabase.from("todos").insert({
      title,
      content,
      due_date,
      user_id: user.data.user?.id,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    return {
      message: "Database Error: Failed to Create Todo.",
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
