export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <>
      <div className='scroll'>
        {children}
      </div>
      </>
  );
}
