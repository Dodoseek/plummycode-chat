import { LINKS, CLASSNAME, STROKE, STROKEWIDTH } from '@/constants/navigation'
import { FC } from 'react'
import Navigation from './Navigation'
import React from 'react'
import Image from 'next/image'
import { getServerSession } from 'next-auth/next'
import { authConfug } from '@/configs/auth'

const Footer: FC = async () => {

    const session = await getServerSession(authConfug);
    session && !LINKS.some((obj) => {
        return obj.href === "/" + session.user.slug
    }) ?
        LINKS.push({
            href: "/" + session.user.slug,
            icon: <div className='p-px bg-violet-200 rounded-full'><Image className=' border-violet-500 border rounded-full' width={25} height={25} src={session.user.image!}
                alt={session.user.name ? session.user.name : 'user'} priority /></div>
        }) : null


    return (
        <nav className="rounded-t-md flex-shrink flex-grow w-full bg-gray-900/60">
            <ul className='nav-container'>
                <Navigation links={LINKS} />
            </ul >
        </nav >
    )

}

export default Footer