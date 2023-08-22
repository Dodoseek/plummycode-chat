import { NextPage } from 'next'
import ChatUser from '@/components/Chat/ChatUserPanel';

const ChatPage: NextPage = () => {

  const getTime = (): string => {
    const date = new Date()
    const hour = checkNumber(date.getHours().toString())
    const minutes = checkNumber(date.getMinutes().toString())
    return `${hour}:${minutes}`
  };


  const checkNumber = (string: string): string =>
  string.length === 1 ? '0' + string : string;

  return (
  <>
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

  </>
  )
}

export default ChatPage