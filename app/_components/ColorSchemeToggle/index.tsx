'use client'

import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'

export function ColorSchemeToggle() {
    const { colorScheme, setColorScheme } = useMantineColorScheme()

    // Funktion zum Wechseln des Farbschemas.
    const toggleColorScheme = () =>
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')

    return (
        <ActionIcon
            onClick={toggleColorScheme}
            variant="filled"
            size="lg"
            aria-label="Toggle color scheme"
        >
            {colorScheme === 'dark' ? (
                <IconSun stroke={1.5} />
            ) : (
                <IconMoon stroke={1.5} />
            )}
        </ActionIcon>
    )
}
