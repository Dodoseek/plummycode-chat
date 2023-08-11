import DetailNavigation from '@/components/Navigation/DetailNavigation'
import Scrollbar from '@/components/Navigation/Scrollbar';
import UserPanel from '@/components/Users/UserPanel';
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
          <UserPanel name='Jonh Doe' image='/im.webp' />
          <UserPanel name='Jonh Doe' image='/im.webp' />
          <UserPanel name='Jonh Doe' image='/im.webp' />
          <UserPanel name='Jonh Doe' image='/im.webp' />
          <UserPanel name='Jonh Doe' image='/im.webp' />
          <UserPanel name='Jonh Doe' image='/im.webp' />
          <UserPanel name='Jonh Doe' image='/im.webp' />
          <UserPanel name='Jonh Doe' image='/im.webp' />
          <UserPanel name='Jonh Doe' image='/im.webp' />
          <UserPanel name='Jonh Doe' image='/im.webp' />
          <UserPanel name='Jonh Doe' image='/im.webp' />
          <UserPanel name='Jonh Doe' image='/im.webp' />
          <UserPanel name='Jonh Doe' image='/im.webp' />
          <UserPanel name='Jonh Doe' image='/im.webp' />
          <UserPanel name='Jonh Doe' image='/im.webp' />
        </Scrollbar>
      </DetailNavigation>
      {children}
    </>
  );
}
