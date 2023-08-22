import { FC } from 'react'

const Loading: FC = () => {
  return (
    <div className="flex mb-2 pr-1 w-full">
        <div className="w-full skeleton-loading h-20 bg-gray-300 flex rounded-md">
            <div className='min-w-fit skeleton-loading items-center flex ml-2'>
                <div  className='h-16 w-16 block bg-gray-400 rounded-full' />
            </div>
            <div className="flex flex-col justify-center pr-5 w-full">
                <div className="flex justify-between items-center overflow-hidden ml-5">
                        <h4 className='sm:w-auto skeleton-loading bg-gray-400 rounded-md'>
                            <div className="w-48">
                                &nbsp;
                            </div>
                        </h4>
                    <div className="skeleton-loading bg-gray-400 h-8 w-10 rounded-md">
                        &nbsp;
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Loading