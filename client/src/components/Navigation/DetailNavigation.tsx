import { FC, ReactNode } from 'react'

interface DetailNavigationProps {
  children: ReactNode;
  title: string;
}

const DetailNavigation: FC<DetailNavigationProps> = ({ children, title }) => {
  return (
    <article className='flex px-1 flex-col items-center w-64 md:w-80 lg:w-96  h-full bg-violet-200 border-r-gray-300 border-r'>
      <h1 className='h-10 font-bold items-center pl-4 py-4 mb-6 text-gray-600 w-full text-2xl '>{title}</h1>
      {children}
    </article>
  );
}

export default DetailNavigation