'use client'

import { MantineProvider } from '@mantine/core'
import { getTheme } from '@/_styles/theme'
import { useEffect, useState } from 'react'
import { Notifications } from '@mantine/notifications'
import AppContainer from '@/_components/AppContainer'
import { getCookie } from 'cookies-next'
import { UserProvider } from '@/_context/UserContext'
import LoginPage from '@/(auth)/login/page'

export function Provider({
    children,
    isLoggedIn,
}: Readonly<{
    children: React.ReactNode
    isLoggedIn: boolean
}>) {
    const [primaryColor, setPrimaryColor] = useState('funkyPurple')
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const color = getCookie('primaryColor')
        setPrimaryColor(color || 'funkyPurple')
        document.documentElement.setAttribute(
            'primary-color',
            color || 'funkyPurple'
        )
        setIsLoading(false)
    }, [])
    const theme = getTheme(primaryColor)
    return (
        <>
            {isLoading && <div>Loading...</div>}
            {!isLoading && (
                <MantineProvider theme={theme} defaultColorScheme="auto">
                    {isLoggedIn && (
                        <UserProvider>
                            <AppContainer setPrimaryColor={setPrimaryColor}>
                                <Notifications />
                                {children}
                            </AppContainer>
                        </UserProvider>
                    )}
                    {!isLoggedIn && <LoginPage />}
                </MantineProvider>
            )}
        </>
    )
}
