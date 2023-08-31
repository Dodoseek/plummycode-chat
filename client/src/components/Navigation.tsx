'use client';
import { Links } from '@/types/types';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

const Navigation: FC<Links> = ({ links }) => {
    const pathname = usePathname()
    return (<>
        {
            links.map(({ href, icon }) =>
                <Link key={href} href={href} className={pathname === href ? ' nav-item-active' : 'nav-item'} >
                    {icon}
                </Link>
            )
        }
    </>
    )

}

export default Navigation