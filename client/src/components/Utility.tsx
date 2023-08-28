import { FC, ReactNode, PropsWithChildren } from 'react'


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


interface DetailNavigationProps {
  children: ReactNode;
  title: string;
};


export const TitleNavigation: FC<DetailNavigationProps> = ({ children, title }) => {
  return (
    <article className='flex px-1 flex-col items-center w-full  h-full bg-violet-200 border-r-gray-300 border-r'>
      <h1 className='h-10 font-bold items-center pl-4 py-4 mb-6 text-gray-600 w-full text-2xl '>{title}</h1>
      {children}
    </article>
  );
};



export const Scrollbar: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div className="overflow-y-scroll w-full rounded-lg">
      {children}
    </div>
  );
};