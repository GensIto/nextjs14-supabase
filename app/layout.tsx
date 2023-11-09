import { GeistSans } from "geist/font";
import "./globals.css";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Todo app",
  description: "Next.js and Supabase todo app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  return (
    <html lang='en' className={GeistSans.className}>
      <body className='bg-background text-foreground'>
        <main className='min-h-screen flex flex-col items-center'>
          <header className='w-full'>
            <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
              <div className='w-full flex justify-end items-center p-3 text-sm'>
                {isSupabaseConnected && <AuthButton />}
              </div>
            </nav>
          </header>
          {children}
          <footer className='w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs'>
            <p>
              Powered by{" "}
              <a
                href='https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs'
                target='_blank'
                className='font-bold hover:underline'
                rel='noreferrer'
              >
                Supabase
              </a>
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}
