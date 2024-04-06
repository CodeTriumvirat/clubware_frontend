'use client'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { useContext } from 'react'
import { ThemeContext } from '@/_context/ThemeContext'

export function Provider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { isLoadingTheme, theme } = useContext(ThemeContext)

    return (
        <>
            {isLoadingTheme && <div>Loading..</div>}
            {!isLoadingTheme && (
                <MantineProvider theme={theme} defaultColorScheme="auto">
                    <Notifications />
                    {children}
                </MantineProvider>
            )}
        </>
    )
}
