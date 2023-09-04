import { LINKS } from '@/constants/navigation'
import { FC } from 'react'
import Navigation from './Navigation'
import React from 'react'
import Image from 'next/image'
import { getServerSession } from 'next-auth/next'
import { authConfug } from '@/configs/auth'
import Link from 'next/link'
import { headers } from "next/headers";

export const dynamicParams = true

const Footer: FC = async () => {
    const headersList = headers();

    const session = await getServerSession(authConfug);
    const pathname = headersList.get("x-pathname");

    return (
        <nav className="rounded-t-md flex-shrink flex-grow w-full bg-gray-900/60">
            <ul className='nav-container'>
                <Navigation links={LINKS} />
                {<Link href={`/${session?.user.slug}`} className={pathname === `/${session?.user.slug}` ? ' nav-item-active' : 'nav-item'} >
                    <div className='p-px bg-violet-200 rounded-full'>
                        <Image className=' border-violet-500 border rounded-full' width={25} height={25} src={session?.user.image!}
                            alt={session?.user.full_name ? session.user.full_name : 'user'} priority />
                    </div>
                </Link>}
            </ul >
        </nav >
    )

}

export default Footer