import AppContainer from '@/_components/AppContainer'
import { UserProvider } from '@/_context/UserContext'

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <UserProvider>
                <AppContainer>{children}</AppContainer>
            </UserProvider>
        </>
    )
}
