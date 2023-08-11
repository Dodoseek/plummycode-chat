import ChatUser from '@/components/Chat/ChatUserPanel';
import DetailNavigation from '@/components/Navigation/DetailNavigation'
import Scrollbar from '@/components/Navigation/Scrollbar';

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const checkNumber = (string: string): string =>
    string.length === 1 ? '0' + string : string;

  const getTime = (): string => {
    const date = new Date()
    const hour = checkNumber(date.getHours().toString())
    const minutes = checkNumber(date.getMinutes().toString())
    return `${hour}:${minutes}`
  };

  return (
    <>
      <DetailNavigation title='Chats'>
        <Scrollbar>
          <ChatUser name='Jonh Doe' message='Message...' date={getTime()} image='/im.webp' />
          <ChatUser name='Jonh Doe' message='Message...' date={getTime()} image='/im.webp' />
          <ChatUser name='Jonh Doe' message='Message...' date={getTime()} image='/im.webp' />
          <ChatUser name='Jonh Doe' message='Message...' date={getTime()} image='/im.webp' />
          <ChatUser name='Jonh Doe' message='Message...' date={getTime()} image='/im.webp' />
          <ChatUser name='Jonh Doe' message='Message...' date={getTime()} image='/im.webp' />
          <ChatUser name='Jonh Doe' message='Message...' date={getTime()} image='/im.webp' />
          <ChatUser name='Jonh Doe' message='Message...' date={getTime()} image='/im.webp' />
          <ChatUser name='Jonh Doe' message='Message...' date={getTime()} image='/im.webp' />
          <ChatUser name='Jonh Doe' message='Message...' date={getTime()} image='/im.webp' />
          <ChatUser name='Jonh Doe' message='Message...' date={getTime()} image='/im.webp' />
          <ChatUser name='Jonh Doe' message='Message...' date={getTime()} image='/im.webp' />
          <ChatUser name='Jonh Doe' message='Message...' date={getTime()} image='/im.webp' />
          <ChatUser name='Jonh Doe' message='Message...' date={getTime()} image='/im.webp' />
          <ChatUser name='Jonh Doe' message='Message...' date={getTime()} image='/im.webp' />
        </Scrollbar>
      </DetailNavigation>
      {children}
    </>
  );
}
