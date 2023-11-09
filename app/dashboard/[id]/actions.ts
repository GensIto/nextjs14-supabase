import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const getTodo = async (id: string) => {
  "use server";
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
};
