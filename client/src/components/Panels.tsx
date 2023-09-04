import Link from 'next/link';
import { FC } from 'react'
import Image from 'next/image'
import { Chat } from '@/types/chat';
import { RestrictiveUser } from '@/types/users';
import { FriendRequest } from '@/types/friends';
import { DropDownUsers } from './DropDownMenu';
import { AddDefault, CloseDefault } from './Utility';

export const UserPanel: FC<RestrictiveUser> = async (user) => {
    const name = user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username;

    return (
        <div className="flex mb-2 pr-1 w-full">
            <div className="w-full h-20 flex bg-purple-100 hover:bg-purple-50 rounded-md">
                <Link className='min-w-fit items-center flex ml-2' href={`/user/${user.slug}`}>
                    <Image alt={name} className='h-16 w-16 block rounded-full object-cover' width={50} height={50} src={user.image} />
                </Link>
                <div className="flex flex-col justify-center pr-5 w-full">
                    <div className="flex justify-between items-center overflow-hidden ml-5">
                        <Link href={`/${user.slug}`} >
                            <h4 className='font-bold hover:text-gray-900 sm:w-auto w-36 whitespace-nowrap overflow-hidden text-ellipsis'>{name}</h4>
                        </Link>
                        <DropDownUsers user={user}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>
                        </DropDownUsers>
                    </div>
                </div>
            </div>
        </div>


    );
}


export const ChatPanel: FC<Omit<Chat, 'id' | 'users'>> = async ({ name, last_message, image }) => {
    const checkNumber = (string: string): string =>
        string.length === 1 ? '0' + string : string;

    return (
        <Link href='#' className="flex mb-2 pr-1 w-full">
            <div className="w-full h-20 flex bg-purple-100 hover:bg-purple-50 rounded-md">
                <Image alt={name} className='h-16 self-center w-16 ml-1 rounded-full object-cover' width={50} height={50} src={image} />
                <div className="flex flex-col justify-center pr-5 w-full relative">
                    <div className="flex justify-between items-center overflow-hidden ml-3">
                        <h4 className='font-bold'>{name}</h4>
                        <time className='text-sm'>{last_message.date ? checkNumber(last_message.date.toLocaleString()) : "Now"}</time>
                    </div>
                    <div className="flex">
                        <h3 className='ml-3 mt-2'>{last_message.text ?? "Write the first message!"}</h3>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export const ProfileInfoPanel: FC<InfoTabs> = ({ title, value }) => {
    return (
        <>
            <li
                key={value}
                className="relative rounded-md p-3 hover:bg-gray-100"
            >
                <h3 className="text-sm font-medium leading-5">
                    {value}
                </h3>

                <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                    <li>{title}</li>
                </ul>
            </li>
        </>
    )
};

export const FriendProfilePanel: FC<RestrictiveUser> = ({ id, image, first_name, last_name, username, slug }) => {
    return (
        <>
            <li
                key={id}
                className="relative rounded-md p-3 flex items-center justify-between hover:bg-gray-100"
            >

                <div className='bg-violet-400 p-px rounded-full'>
                    <Image src={image} width={50} height={50} alt={first_name && last_name
                        ? `${first_name} ${last_name}`
                        : username} className='h-10 w-10 rounded-full object-cover' />
                </div>
                <h3 className="text-sm font-medium leading-5">
                    {first_name && last_name
                        ? `${first_name} ${last_name}`
                        : username}
                </h3>

                <Link
                    href={slug}
                    className='absolute inset-0 rounded-md
                    ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                />
            </li>
        </>
    )
};

export const ReceivedPanel: FC<FriendRequest> = ({ id, is_active, receiver, sender, timestamp }) => {
    return (
        <article className='h-20 my-1 flex justify-between items-center px-5 bg-purple-600/20 rounded-md'>
            <div className='flex items-center justify-between w-10/12'>
                <Image className='image-default' alt={sender.full_name!} src={sender.image} width={50} height={50} />
                <p className='w-full ps-5 text-center text-ellipsis'>{sender.full_name}</p>
            </div>
            <div className='w-full flex flex-col justify-evenly h-full'>
                <div className='flex w-full justify-around'>
                    <button className='bg-green-500 hover:bg-green-400 w-10 h-10 flex justify-center items-center rounded-full border border-green-600'>
                        <AddDefault color='#14532d' />
                    </button>
                    <button className='bg-red-500 hover:bg-red-400 w-10 h-10 flex justify-center items-center rounded-full border border-red-600'>
                        <CloseDefault color='#450a0a' />
                    </button>
                </div>
                <time className='text-end text-gray-500'>{timestamp.toString()}</time>
            </div>
        </article>
    )
};


export const SendedPanel: FC<FriendRequest> = ({ id, is_active, receiver, sender, timestamp }) => {
    return (
        <article className='h-20 my-1 flex justify-between items-center px-5 bg-purple-600/20 rounded-md'>
            <div>
                <Image className='image-default' alt={receiver.full_name!} src={receiver.image} width={50} height={50} />
                <p>{receiver.full_name}</p>
            </div>
            <div>
                <button>
                    ok
                </button>
                <button>
                    not
                </button>
                <time className=' text-gray-500'>{timestamp.toString()}</time>
            </div>
        </article>
    )
};