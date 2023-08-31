import Link from 'next/link';
import { PropsWithChildren } from 'react'
import Image from 'next/image'


interface UserForPanel {
    username: string,
    image: string,
    slug: string,
}

export const UserPanel: React.ComponentType<PropsWithChildren<UserForPanel>> = async ({ username, image, slug }) => {

    return (
        <div className="flex mb-2 pr-1 w-full">
            <div className="w-full h-20 flex bg-purple-100 hover:bg-purple-50 rounded-md">
                <Link className='min-w-fit items-center flex ml-2' href={`/user/${slug}`}>
                    <Image alt={username} className='h-16 w-16 block rounded-full' width={50} height={50} src={image} />
                </Link>
                <div className="flex flex-col justify-center pr-5 w-full">
                    <div className="flex justify-between items-center overflow-hidden ml-5">
                        <Link href={`/user/${slug}`} >
                            <h4 className='font-bold hover:text-gray-900 sm:w-auto w-36 whitespace-nowrap overflow-hidden text-ellipsis'>{username}</h4>
                        </Link>
                        <Link href="#" className="bg-violet-600 hover:bg-violet-500 h-8 w-10 flex justify-center items-center rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>


    );
}

interface User {
    name?: string,
    date: Date | string,
    message?: string,
    image: string
}

export const ChatUserPanel: React.ComponentType<PropsWithChildren<User>> = async ({ name, date, message, image }) => {
    return (
        <Link href='#' className="flex mb-2 pr-1 w-full">
            <div className="w-full h-20 flex bg-purple-100 hover:bg-purple-50 rounded-md">
                <Image alt='John' className='h-16 self-center w-16 ml-1 rounded-full' width={50} height={50} src={image} />
                <div className="flex flex-col justify-center pr-5 w-full">
                    <div className="flex justify-between items-center overflow-hidden ml-3">
                        <h4 className='font-bold'>{name}</h4>
                        <time className='text-sm'>{date.toLocaleString()}</time>
                    </div>
                    <div className="flex">
                        <h3 className='ml-3 mt-2'>{message}</h3>
                    </div>
                </div>
            </div>
        </Link>
    );
};