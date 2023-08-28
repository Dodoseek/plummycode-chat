'use client';
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import { FC } from 'react'
import { signOut } from 'next-auth/react'
import google_logo from '@/assets/google-icon.svg'
import Image from 'next/image'


export const SignIn: FC = () => {

    const searchParams = useSearchParams()!;
    const callbackUrl = searchParams.get('callbackUrl') || '/chat';

    const signInHandler = () => {
        signIn('credentials', { callbackUrl, redirect: true })
            .then(() => {
                // dispatch(setIsOpen(true));
            })
    }

    return <Link href="#" onClick={() => signInHandler()}>Sign In</Link>
}




export const SignOut: FC = () => {
    return <Link href="#" onClick={() => signOut({ callbackUrl: '/chat', })}>Sign Out</Link>
}

interface ButtonAction {
    action: string
}

export const GoogleButton: FC<ButtonAction> = ({ action }) => {

    const searchParams = useSearchParams()!;
    const callbackUrl = searchParams.get('callbackUrl') || '/chat';

    return (
        <button
            className='w-full flex justify-center items-center py-1 border-2 
            font-semibold border-gray-400 rounded-md bg-white 
            hover:bg-gray-200'
            onClick={() => signIn('google', { callbackUrl })}>
            <Image src={google_logo} alt='' className='h-6' />
            {action} with Google
        </button>
    )
};
