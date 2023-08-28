import { Scrollbar, TitleNavigation } from '@/components/Utility';

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TitleNavigation title='Chats'>
      <Scrollbar>
        {children}
      </Scrollbar>
    </TitleNavigation>
  );
}
