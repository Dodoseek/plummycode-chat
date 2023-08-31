import { SignOut } from '@/components/Sign'
import { authConfug } from '@/configs/auth'
import { getServerSession } from 'next-auth/next'
import { FC } from 'react'
import Image from 'next/image'
import { Tabs } from '@/components/Tabs'
import { userInformation } from '@/constants/profile'
import { getFriendListById } from '@/services/FriendListActions'
import { Names } from '@/types/types'
import { UsersFriends } from '@/types/friends'

const Profile: FC = async () => {

    const session = await getServerSession(authConfug)
    const user = session?.user!;
    const name = user.first_name && user?.last_name
        ? `${user?.first_name} ${user?.last_name}`
        : user?.username

    const userInfo = await userInformation();
    const friendsData = await getFriendListById(session?.user.id!) as UsersFriends
    const friendsInfo = {
        name: Names.friends,
        list: friendsData.friends
    }
    console.log(friendsInfo)

    return (
        <>
            <div className='flex flex-col items-center justify-evenly py-10'>
                <div className="p-px h-100 bg-white rounded-full">
                    <Image
                        alt={name}
                        src={user.image!} width={250} height={250} className='p-px h-100 bg-violet-600 rounded-full' />
                </div>
            </div>
            <div className='w-full flex items-center flex-col'>
                <Tabs profile={[{ ...userInfo }, { ...friendsInfo }]} />
                <SignOut />
            </div>
        </>
    )
}

export default Profile