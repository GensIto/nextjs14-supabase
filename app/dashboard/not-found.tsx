export default function NotFound() {
  return (
    <div className='flex-1 w-full flex flex-col gap-20 items-center'>
      <div className='animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3'>
        <div className='flex flex-col gap-16 items-center'>
          <p className='text-red text-lg'>Not Found</p>
        </div>
      </div>
    </div>
  );
}
