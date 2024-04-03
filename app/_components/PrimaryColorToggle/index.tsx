import { Button, Popover, Stack } from '@mantine/core'
import { setPrimaryColorCookie } from './actions'

export function PrimaryColorToggle({
    setPrimaryColor,
}: Readonly<{
    setPrimaryColor: (color: string) => void
}>) {
    return (
        <>
            <Popover
                width={200}
                position="bottom-end"
                withArrow
                arrowPosition="side"
                clickOutsideEvents={['mouseup', 'touchend']}
                offset={12}
                arrowSize={12}
            >
                <Popover.Target>
                    <Button>Toggle Styles</Button>
                </Popover.Target>
                <Popover.Dropdown>
                    <Stack my="xs" gap="lg">
                        <Button
                            bg="habibiViolet"
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
                            bg="funkyPurple"
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
                    </Stack>
                </Popover.Dropdown>
            </Popover>
        </>
    )
}
