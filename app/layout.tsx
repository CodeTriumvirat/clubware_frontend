import type { Metadata } from 'next'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import '@/_styles/globals.css'
import { theme } from '@/_styles/theme'
import { Notifications } from '@mantine/notifications'
import AppContainer from '@/_components/AppContainer'
import { createClient } from '@/_utils/supabase/server'

export const metadata: Metadata = {
    title: 'ClubWare ERP',
    description: 'Enterprise-Resource-Planning-System for Clubs & Festivals',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const supabase = createClient()
    const { error } = await supabase.auth.getUser()

    let isLoggedIn = false
    if (!error) {
        isLoggedIn = true
    }

    return (
        <html lang="de">
            <head>
                <ColorSchemeScript defaultColorScheme="auto" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                <MantineProvider theme={theme} defaultColorScheme="auto">
                    <Notifications />
                    <AppContainer isLoggedIn={isLoggedIn}>
                        {children}
                    </AppContainer>
                </MantineProvider>
            </body>
        </html>
    )
}
