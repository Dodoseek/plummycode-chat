'use client';
import { FC, useRef, useState } from 'react'
import Image from 'next/image'
import logo from '@/assets/plummychat.svg'
import { GoogleButton } from '@/components/Sign'
import { useRouter, useSearchParams } from 'next/navigation';
import { ErrorDefault, LoadingDefault, SuccesDefault } from '@/components/Utility';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const SignIn: FC = () => {

    const searchParams = useSearchParams()!;
    const callbackUrl = searchParams.get('callbackUrl') || '/chat';

    let initialData = {
        email: 'glushnev22@gmail.com',
        password: '1234'
    };

    const submitButton = useRef<HTMLButtonElement | null>(null)
    const [userData, setUserData] = useState(initialData);
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const { push } = useRouter();


    const enableButton = () => {
        submitButton.current!.disabled = true
    };

    const disableButton = () => {
        submitButton.current!.disabled = false
    };


    const handleSubmit = async () => {
        disableButton();
        setLoading(true);
        const res = await signIn('credentials', {
            callbackUrl,
            redirect: true,
            password: userData.password,
            email: userData.email
        })
        setLoading(false);
        if (res && !res.error) {
            console.log(res && !res.error);
            setSuccess(true);
            push('/chat');
        } else {
            console.log(res && !res.error);
            enableButton()
            setError(true);
            console.log(res?.error);
        }
    };

    return (
        <>
            <main className="w-screen sm:max-w-xl px-20 bg-purple-200 rounded-none sm:rounded-xl shadow-sm drop-shadow-xl shadow-gray-500 py-20">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        className="mx-auto h-12 w-auto"
                        src={logo}
                        alt="Plummy Chat"
                        priority />
                    <h2 className="mt-10 text-center text-xl font-semibold leading-9 tracking-tight 
                    text-gray-900">
                        Account registration
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 
                            text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    value={userData.email}
                                    onChange={e => setUserData({ ...userData, email: e.target.value })}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 
                                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 p-1
                                    placeholder:text-sm font-semibold" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium 
                                leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={e => setUserData({ ...userData, password: e.target.value })}
                                    value={userData.password}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 
                                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 p-1
                                    placeholder:text-sm font-semibold" />
                            </div>
                        </div>
                        <div>
                            <button
                                ref={submitButton}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 
                                px-3 py-1.5 text-sm font-semibold leading-6 text-white
                                shadow-sm hover:bg-indigo-500 focus-visible:outline
                                focus-visible:outline-2 focus-visible:outline-offset-2
                                focus-visible:outline-indigo-600">
                                {
                                    isLoading ? <div className='icons'><LoadingDefault width={'24'} /></div> :
                                        isSuccess ? <div className='icons'><SuccesDefault color='white' width={'30'} /></div> :
                                            isError ? <div className='icons'><ErrorDefault width={'30'} color='white' /></div> : 'Sign in'}
                            </button>
                        </div>
                    </form>
                    <div className='text-gray-900 my-4 font-semibold w-full flex justify-center separator'>
                        or
                    </div>
                    <GoogleButton action='Register' />
                </div>
            </main>
            <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Sign in
                </Link>
            </p>
        </>
    )
}

export default SignIn