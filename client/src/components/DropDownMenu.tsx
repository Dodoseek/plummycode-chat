'use client';
import { Popover, Transition } from '@headlessui/react'
import { usePopper } from 'react-popper'
import Link from 'next/link';
import { useState } from 'react';
import { RestrictiveUser } from '@/types/users';
import { useCreateRequestMutation } from '@/store/recipes/friends.recipe';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ErrorDefault, SuccesDefault } from './Utility';

export function DropDownUsers({ children, user }: { children: React.ReactNode, user: RestrictiveUser }) {
    const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null)
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement)
    const session = useSession()

    const [createRequest, { isError, isLoading, isSuccess }] = useCreateRequestMutation()
    const router = useRouter()

    const requestHandler = async () => {
        const response = await createRequest({ user: user.id, access_token: session.data!.access_token! }).unwrap()
        console.log(response)
    }

    const links = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="purple"
                className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>,
            label: 'View profile',
            action: () => { router.push(`/${user.slug}`) },
            className: 'dropdown-select',
            disabled: false
        },
        {
            icon: isSuccess ? <SuccesDefault color='green'/> : 
            isError ? <ErrorDefault color='red'/> : <svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="purple"
                className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>,
            label: 'Add to Friends',
            action: () => { requestHandler() },
            className: 'dropdown-select',
            disabled: isSuccess ? true : false
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="purple"
                className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>,
            label: 'Block a user',
            action: () => { },
            className: 'dropdown-select',
            disabled: false
        }
    ]

    return (
        <Popover >
            <Popover.Button ref={setReferenceElement}>
                {children}
            </Popover.Button>

            <Transition className='absolute z-10'

                enter="transition duration-75 ease-out"
                enterFrom="transform scale-100 opacity-0"
                enterTo="transform scale-95 opacity-100"

                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-95 opacity-100"
                leaveTo="transform scale-100 opacity-0"
            >
                <Popover.Panel
                    as='div'
                    className='bg-purple-300/70 
                    flex flex-col justify-center items-center w-48 rounded-md 
                    border-2 border-purple-500'
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    {links.map(({ action, icon, label, className, disabled }) => {
                        return (
                            <button key={label}
                            disabled={disabled}
                                onClick={action}
                                className={className}>
                                {icon}
                                {label}
                            </button>
                        )
                    })}
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}