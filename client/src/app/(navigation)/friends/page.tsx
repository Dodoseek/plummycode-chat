import { UserPanel } from '@/components/UserPanels';
import { IsEmpty } from '@/components/Utility';
import { authConfug } from '@/configs/auth';
import { getFriendListById } from '@/services/FriendListActions';
import { UsersFriends } from '@/types/friends';
import { getServerSession } from 'next-auth';
import { FC } from 'react'


const FriendsPage: FC = async () => {

    const session = await getServerSession(authConfug)

    const data = await getFriendListById(session?.user.id!) as UsersFriends

    return (
        <>
            {data?.friends.length > 0 ? data.friends.map((user) => {
                return <UserPanel key={user.id}
                    username={user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username}
                    image={user.image} slug={user.slug} />
            }) :
                <IsEmpty text='The friends list is empty :(' buttonToUsers={true} />}
        </>
    );
}

export default FriendsPage