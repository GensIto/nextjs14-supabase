import { cookies } from "next/headers";
import TodoList from "./components/TodoList";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className='flex-1 w-full flex flex-col gap-20 items-center'>
      <div className='animate-in w-full flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3'>
        <div className='flex flex-col gap-16 items-center'>
          {user ? (
            <TodoList />
          ) : (
            <Link href='/login' className='text-xl cursor-pointer'>
              Please Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
