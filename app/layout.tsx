import type { Metadata } from 'next'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import './styles/globals.css'
import { theme } from '@/styles/theme'

export const metadata: Metadata = {
    title: 'ClubWare ERP',
    description: 'Enterprise-Resource-Planning-System for Clubs & Festivals',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="de">
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                {' '}
                <MantineProvider theme={theme}>{children}</MantineProvider>
            </body>
        </html>
    )
}
