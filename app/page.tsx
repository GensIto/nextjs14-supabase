import NextLogo from "@/components/NextLogo";
import SupabaseLogo from "@/components/SupabaseLogo";

export default async function Index() {
  return (
    <div className='flex-1 w-full flex flex-col gap-20 items-center'>
      <div className='animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3'>
        <div className='flex flex-col gap-16 items-center'>
          <div className='flex gap-4 justify-center items-center'>
            <a
              href='https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs'
              target='_blank'
              rel='noreferrer'
            >
              <SupabaseLogo />
            </a>
            <p className='text-xl !leading-tight'>and </p>
            <a href='https://nextjs.org/' target='_blank' rel='noreferrer'>
              <NextLogo />
            </a>
            <p className='text-xl !leading-tight'>Todo app</p>
          </div>
        </div>
      </div>
    </div>
  );
}
