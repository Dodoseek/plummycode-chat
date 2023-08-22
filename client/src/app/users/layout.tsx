'use client'
import DetailNavigation from '@/components/Navigation/DetailNavigation'
import Scrollbar from '@/components/Navigation/Scrollbar';
import UserSearch from '@/components/Users/UserSearch';

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <DetailNavigation title='Users'>
        <UserSearch />
        <Scrollbar>
          {children}
        </Scrollbar>
      </DetailNavigation>
    </>
  );
}
