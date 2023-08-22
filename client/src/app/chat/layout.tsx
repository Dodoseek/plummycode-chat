import DetailNavigation from '@/components/Navigation/DetailNavigation'
import Scrollbar from '@/components/Navigation/Scrollbar';

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <DetailNavigation title='Chats'>
        <Scrollbar>
          {children}
        </Scrollbar>
      </DetailNavigation>
  );
}
