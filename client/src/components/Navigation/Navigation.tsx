import { LINKS } from '@/constants/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

const Navigation: FC<PropsWithChildren> = ({children}) => {
    const pathname = usePathname()

    return (    
    <nav className="h-12 w-full bg-gray-700">
        {children}
        <ul className='nav-container'>
            {LINKS.map(({href, icon})=>
                <Link key={href} href={href} className={pathname === href ? ' nav-item-active' : 'nav-item'} >
                    {icon}
                </Link>
            )}
        </ul >
    </nav >
    )

}

export default Navigation