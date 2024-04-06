import AppContainer from '@/(protected)/AppContainer'
import { Provider } from './Provider'

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Provider>
                <AppContainer>{children}</AppContainer>
            </Provider>
        </>
    )
}
