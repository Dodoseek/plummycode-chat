import { ChatPanel } from '@/components/UserPanels';
import { IsEmpty } from '@/components/Utility';
import { authConfug } from '@/configs/auth';
import { getMyChats } from '@/services/ChatActions';
import { MyChatsList } from '@/types/chat';
import { getServerSession } from 'next-auth';
import { FC } from 'react';

const ChatPage: FC = async () => {

  const session = await getServerSession(authConfug)
  const data = await getMyChats(session?.access_token!) as MyChatsList
  // console.log(data)

  return (
    <>
      {data.results.length > 0 ? data.results.map(({ image, id, name, last_message }) => {
        return <ChatPanel key={id} image={image} name={name} last_message={last_message} />
      }) :
        <IsEmpty text='The chat list is empty' buttonToUsers={true} />}
    </>
  )
}

export default ChatPage