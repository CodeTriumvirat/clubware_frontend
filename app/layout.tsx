import '@/_styles/globals.css'
import { ColorSchemeScript } from '@mantine/core'
import type { Metadata } from 'next'
import { Provider } from '@/Provider'
import { ThemeProvider } from './_context/ThemeContext'

export const metadata: Metadata = {
    title: 'ClubWare ERP',
    description: 'Enterprise-Resource-Planning-System for Clubs & Festivals',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
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
                <ThemeProvider>
                    <Provider>{children}</Provider>
                </ThemeProvider>
            </body>
        </html>
    )
}
