import { Button } from '@mantine/core'
import { setPrimaryColorCookie } from './actions'

export function PrimaryColorToggle({
    setPrimaryColor,
}: Readonly<{
    setPrimaryColor: (color: string) => void
}>) {
    return (
        <>
            <Button
                onClick={() => {
                    setPrimaryColor('habibiViolet')
                    setPrimaryColorCookie('habibiViolet')
                    document.documentElement.setAttribute(
                        'primary-color',
                        'habibiViolet'
                    )
                }}
            >
                Set habibiViolet
            </Button>
            <Button
                onClick={() => {
                    setPrimaryColor('funkyPurple')
                    setPrimaryColorCookie('funkyPurple')
                    document.documentElement.setAttribute(
                        'primary-color',
                        'funkyPurple'
                    )
                }}
            >
                Set funkyPurple
            </Button>
        </>
    )
}
