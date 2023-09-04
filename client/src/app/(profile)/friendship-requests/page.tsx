import { Tabs } from '@/components/Tabs';
import { authConfug } from '@/configs/auth'
import { getMyRecievedRequests, getMySendedRequests } from '@/services/FriendListActions';
import { FriendResponse, TabFriendRequestNames } from '@/types/friends';
import { getServerSession } from 'next-auth'
import { FC } from 'react'

const FriendListRequests: FC = async () => {

    const session = await getServerSession(authConfug);
    const recievedRequests = await getMyRecievedRequests(session?.access_token!) as FriendResponse;
    const sendedRequests = await getMySendedRequests(session?.access_token!) as FriendResponse;

    const recievedInfo = {
        name: TabFriendRequestNames.received,
        list: recievedRequests.results
    } as TabObject

    const sendedInfo = {
        name: TabFriendRequestNames.submitted,
        list: sendedRequests.results
    } as TabObject

    return (
        <>
            <Tabs className='w-full h-full' array={[recievedInfo, sendedInfo]} />
        </>
    )
}

export default FriendListRequests
