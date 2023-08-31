import UserSearch from '@/components/UserSearch';

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <div className='scroll my-1'>
        {children}
      </div>
    </>
  );
}
