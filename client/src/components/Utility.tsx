'use client';
import { PropsUtilityData } from '@/types/types';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react'

export const LoadingDefault: FC<PropsUtilityData> = ({ width = 10, color = 'violet' }) => {
  return (
    <svg className='animate-spin'
      width={`${width}px`} height={`${width}px`} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
      <g fill={color} fillRule="evenodd" clipRule="evenodd">
        <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2" />
        <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z" />
      </g>
    </svg>
  )
};

export const ErrorDefault: FC<PropsUtilityData> = ({ width = 30, color = 'white' }) => {
  return (
    <svg width={width} height={width} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
  )
};

export const SuccesDefault: FC<PropsUtilityData> = ({ width, color = 'white' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color} className="w-6 h-6"
      width={width} height={width}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

export const LoadingHeader: FC = () => {
  return (
    <div className="h-10 inline-flex w-10 justify-end rounded-full skeleton-loading bg-gray-400">
    </div>
  )
};


export const TitleNavigation: FC = () => {


  function modifyString(inputString: string) {
    if (inputString.length < 2) {
      return null;
    }
    const secondChar = inputString[1].toUpperCase();
    const modifiedString = secondChar + inputString.slice(2);
    return modifiedString;
  }

  return (
    <h1 className='font-bold font-inco text-gray-600 w-full text-2xl'>{modifyString(usePathname()!)}</h1>
  );
};


export const BackButton: FC<PropsUtilityData> = ({ color, width, className }) => {

  const router = useRouter()

  return (
    <button onClick={() => { router.back() }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        width={width}
        height={width}
        className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
  )
}
