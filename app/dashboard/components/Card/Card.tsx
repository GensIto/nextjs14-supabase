import { Database } from "@/utils/supabase/dbType";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Card({
  todo,
}: {
  todo: Database["public"]["Tables"]["todos"]["Row"];
}) {
  if (todo === null) return null;

  const deleteTodo = async () => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase
      .from("todos")
      .delete()
      .match({ id: todo.id });
    if (error) {
      alert(error.message);
    } else {
      revalidatePath("/dashboard");
      redirect("/dashboard");
    }
  };
  const updateTodo = async () => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase
      .from("todos")
      .update({ completed: !todo.completed })
      .match({ id: todo.id });
    if (error) {
      alert(error.message);
    } else {
      revalidatePath("/dashboard");
      redirect("/dashboard");
    }
  };

  return (
    <div className='max-w-4xl w-full rounded overflow-hidden shadow-lg'>
      <div className='px-6 py-4'>
        <div className='flex justify-between'>
          <h2 className='font-bold text-xl mb-2'>{todo.title}</h2>
          <div className='flex gap-2 items-center'>
            <form action={deleteTodo}>
              <button className='bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-sm'>
                Delete
              </button>
            </form>
            <form action={updateTodo}>
              <button className='bg-green-500 hover:bg-green-700 text-white py-1 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-sm'>
                {todo.completed ? "Uncomplete" : "Complete"}
              </button>
            </form>
          </div>
        </div>
        <p className='text-gray-700 text-base'>{todo.content}</p>
      </div>
      <div className='px-6 pt-4 pb-2'>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          {todo.due_date}
        </span>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          {todo.completed ? "completed" : "not completed"}
        </span>
      </div>
    </div>
  );
}
