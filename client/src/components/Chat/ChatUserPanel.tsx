import Link from 'next/link';
import { FC, PropsWithChildren } from 'react'
import Image from 'next/image'
import { NextPage } from 'next';

interface User {
    name?: string,
    date: Date | string,
    message?: string,
    image: string
}

const ChatUserPanel: React.ComponentType<PropsWithChildren<User>> = ({name, date, message, image}) => {
    return (
        <Link href='#' className="flex mb-2 pr-1 w-full">
            <div className="w-full h-20 flex bg-purple-100 hover:bg-purple-50 rounded-md">
                <Image alt='John' className='h-16 self-center w-16 ml-1 rounded-full' width={50} height={50} src={image}/>
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
}

export default ChatUserPanel