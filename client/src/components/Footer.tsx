import { LINKS } from '@/constants/navigation'
import { FC } from 'react'
import Navigation from './Navigation'

const Footer: FC = () => {
    return (
        <nav className="h-12 w-full bg-gray-700">
            <ul className='nav-container'>
                <Navigation links={LINKS} />
            </ul >
        </nav >
    )

}

export default Footer