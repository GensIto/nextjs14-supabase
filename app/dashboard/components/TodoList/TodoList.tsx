import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/utils/supabase/dbType";
import Card from "../Card";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function TodoList() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("todos").select("*");

  if (data === null) notFound();
  return (
    <div className='w-full'>
      <div className='mx-auto flex justify-between items-center mb-4'>
        <p className=''>TodoList</p>
        <Link
          className='py-2 px-4 rounded-md no-underline bg-btn-background cursor-pointer hover:bg-btn-background-hover'
          href='/dashboard/create'
        >
          Create New Todo
        </Link>
      </div>
      <ul className='flex flex-col gap-4'>
        {data.map((todo: Database["public"]["Tables"]["todos"]["Row"]) => (
          <li
            className='rounded-md no-underline bg-btn-background cursor-pointer hover:bg-btn-background-hover'
            id={todo.id}
          >
            <Link
              className='py-2 px-4 w-full block'
              href={`/dashboard/${todo.id}`}
            >
              {todo.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
