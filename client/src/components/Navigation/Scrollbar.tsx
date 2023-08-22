import { FC, PropsWithChildren } from 'react'

const Scrollbar: FC<PropsWithChildren<unknown>> = ({ children }) => {
    return (
        <div className="overflow-y-scroll w-full rounded-lg">
            {children}
        </div>
    );
}

export default Scrollbar


