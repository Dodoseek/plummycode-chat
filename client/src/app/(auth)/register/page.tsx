'use client';
import { ChangeEvent, FC, useRef, useState } from 'react'
import Image from 'next/image'
import logo from '@/assets/plummychat.svg'
import { GoogleButton } from '@/components/Sign'
import { useSearchParams } from 'next/navigation';
import { ErrorDefault, LoadingDefault, SuccesDefault } from '@/components/Utility';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useCreateUserMutation } from '@/store/recipes/recipe.user';


const SignIn: FC = () => {


    const searchParams = useSearchParams()!;
    const callbackUrl = searchParams.get('callbackUrl') || '/chat';

    let initialData = {
        username: 'andrew',
        first_name: 'andrew',
        last_name: 'glu',
        email: 'glushnev.90@mail.ru',
        password1: '1234567_C',
        password2: '1234567_C'
    };

    let initialErrors = {
        username: [],
        first_name: [],
        last_name: [],
        email: [],
        password1: [],
    };

    const submitButton = useRef<HTMLButtonElement | null>(null)
    const [createUser, { isError, isLoading, isSuccess }] = useCreateUserMutation()
    const [userData, setUserData] = useState(initialData);
    const [userError, setUserError] = useState(initialErrors);
    const [disabledButton, setDisabled] = useState(false);

    const handleSubmit = async () => {
        setDisabled(true);
        try {
            await createUser(userData).unwrap();
            await signIn('credentials', {
                callbackUrl,
                redirect: true,
                password: userData.password1,
                email: userData.email
            });
        }
        catch (error: any) {
            setDisabled(false)
            setUserError(error.data)
            console.log(error)
            // throw error;
        }
    };


    const fields = [
        {
            id: 'username',
            label: "Username",
            placeholder: "username",
            value: userData.username,
            required: true,
            setData: (e: ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, username: e.target.value }),
            type: 'text',
            errors: userError.username,
        },
        {
            id: 'first_name',
            label: "First name",
            placeholder: 'your first name',
            value: userData.first_name,
            required: false,
            setData: (e: ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, first_name: e.target.value }),
            type: 'text',
            errors: userError.first_name,
        },
        {
            id: 'last_name',
            label: "Last name",
            placeholder: 'your last name',
            value: userData.last_name,
            required: false,
            setData: (e: ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, last_name: e.target.value }),
            type: 'text',
            errors: userError.last_name,
        },
        {
            id: 'email',
            label: "Email address",
            placeholder: 'your email',
            value: userData.email,
            required: true,
            setData: (e: ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, email: e.target.value }),
            type: 'email',
            errors: userError.email,
        },
        {
            id: 'password',
            label: "Password",
            placeholder: 'password',
            value: userData.password1,
            required: true,
            setData: (e: ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, password1: e.target.value }),
            type: 'password',
            errors: userError.password1,
        },
        {
            id: 'password2',
            label: "Retry password",
            placeholder: 'retry password',
            value: userData.password2,
            required: true,
            setData: (e: ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, password2: e.target.value }),
            type: 'password',
            errors: null,
        },
    ]

    return (
        <>
            <main
                className=" w-full sm:max-w-3xl px-4 sm:px-10 bg-purple-200 sm:rounded-none md:rounded-xl 
                shadow-sm drop-shadow-xl shadow-gray-500 py-20">
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
                <div className="mt-10 sm:mx-auto sm:max-w-lg">
                    <form className="space-y-6" onSubmit={handleSubmit} method="post">
                        {fields.map(({ id, label, placeholder, value, required, setData, type, errors }) => {
                            return (
                                <div key={id}>
                                    <label htmlFor="id" className="block text-sm font-medium leading-6 
                            text-gray-900">
                                        {label}{required ? <span className=' text-violet-600'>*</span> : null}
                                        {errors && errors.map((text: string, index) => {
                                            return <span key={index + " " + text} className=' text-violet-600'><br />{text}</span>
                                        })}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder={placeholder}
                                            value={value}
                                            onChange={setData}
                                            id={id}
                                            name={id}
                                            type={type}
                                            autoComplete={id}
                                            required={required}
                                            className="auth-input" />
                                    </div>
                                </div>
                            )
                        })}
                        <div>
                            <button
                                ref={submitButton}
                                type="submit"
                                className="plummy-button w-full"
                                disabled={disabledButton}>
                                {
                                    isLoading ? <div className='icons'><LoadingDefault width={'24'} /></div> :
                                        isSuccess ? <div className='icons'><SuccesDefault color='white' width={'30'} /></div> :
                                            isError ? <div className='icons'><ErrorDefault width={'30'} color='white' /></div> : 'Register'}
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
                <Link href="/login" className="link">
                    Sign in
                </Link>
            </p>
        </>
    )
}

export default SignIn