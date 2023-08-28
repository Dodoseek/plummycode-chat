'use client';

import { Provider } from 'react-redux'
import { FC, PropsWithChildren } from 'react'
import { store } from '@/store/store';
import { SessionProvider } from 'next-auth/react';

const ClientProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
    return (
        <SessionProvider>
            <Provider store={store}>
                {children}
            </Provider>
        </SessionProvider>
    )
}

export default ClientProvider