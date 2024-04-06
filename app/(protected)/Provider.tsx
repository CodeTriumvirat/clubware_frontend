'use client'

import { UserProvider } from '@/_context/UserContext'

export function Provider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <UserProvider>{children}</UserProvider>
        </>
    )
}
