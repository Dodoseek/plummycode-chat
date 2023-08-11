'use client'
import { FC } from 'react'

const UserSearch: FC = () => {

    return (
        <div className="flex h-8 w-full mb-5 justify-center border-violet-600 rounded-lg border-2">
            <input
                type="text"
                className="pl-3 focus border-r-gray-300 border-r-2 rounded-l-md text-gray-500 w-full"
            />
            <button type="submit"
                className="bg-white focus w-10 rounded-r-md flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="gray"
                    className="w-6 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </button>
        </div>
    );
}

export default UserSearch