import { authConfug } from '@/configs/auth'
import { getServerSession } from 'next-auth/next'
import { FC } from 'react'

const Profile: FC = async () => {

    const session = await getServerSession(authConfug)

    return (
        <>
            {session?.user.image}
        </>
    )
}

export default Profile