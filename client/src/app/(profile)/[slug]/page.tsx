import { SignOut } from '@/components/Sign'
import { FC } from 'react'
import Image from 'next/image'
import { Tabs } from '@/components/Tabs'
import { userInformation } from '@/constants/profile'
import { getFriendListById } from '@/services/FriendListActions'
import { TabUserNames, RestrictiveUser } from '@/types/users'
import { UsersFriends } from '@/types/friends'
import { getUserBySlug } from '@/services/UserActions'

interface Params {
    slug: string
}

interface ProfileParams {
    params: Params
}

const Profile: FC<ProfileParams> = async ({ params }) => {

    const user = await getUserBySlug(params.slug) as RestrictiveUser
    const name = user.first_name && user?.last_name
        ? `${user?.first_name} ${user?.last_name}`
        : user?.username

    const userInfo = await userInformation(user);
    const friendsData = await getFriendListById(user.id) as UsersFriends
    const friendsInfo = {
        name: TabUserNames.friends,
        list: friendsData.friends
    } as TabObject

    return (
        <>
            <div className='flex flex-col items-center justify-evenly py-10'>
                <div className="p-px h-100 bg-white rounded-full">
                    <Image
                        alt={name}
                        src={user.image!} width={250} height={250} className='p-px h-64 w-64 object-cover bg-violet-600 rounded-full' />
                </div>
            </div>
            <div className='w-full flex items-center flex-col'>
                <Tabs className="w-full px-2 pb-5 sm:px-0" array={[userInfo, friendsInfo]} />
                <SignOut />
            </div>
        </>
    )
}

export default Profile