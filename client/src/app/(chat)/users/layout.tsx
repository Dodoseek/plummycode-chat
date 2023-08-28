import { Scrollbar, TitleNavigation } from '@/components/Utility';
import UserSearch from '@/components/UserSearch';

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <TitleNavigation title='Users'>
        <UserSearch />
        <Scrollbar>
          {children}
        </Scrollbar>
      </TitleNavigation>
    </>
  );
}
