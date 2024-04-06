'use client'

import { ActionIcon, Button, Popover, Stack } from '@mantine/core'
import { setPrimaryColorCookie } from './actions'
import { IconPalette } from '@tabler/icons-react'
import { ThemeContext } from '@/_context/ThemeContext'
import { useContext } from 'react'

export function PrimaryColorToggle() {
    const { setPrimaryColor } = useContext(ThemeContext)

    return (
        <>
            <Popover
                width={200}
                position="bottom-end"
                clickOutsideEvents={['mouseup', 'touchend']}
                offset={18}
                aria-hidden="true"
            >
                <Popover.Target>
                    <ActionIcon
                        variant="filled"
                        size="lg"
                        aria-label="Toggle color variant"
                    >
                        <IconPalette aria-label="Toggle color variant" />
                    </ActionIcon>
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
