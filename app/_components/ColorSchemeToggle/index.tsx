'use client'

import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { useEffect } from 'react'

export function ColorSchemeToggle() {
    const { colorScheme, setColorScheme } = useMantineColorScheme()

    useEffect(() => {
        const colorSchemeFromElement = document.documentElement.getAttribute(
            'data-mantine-color-scheme'
        ) as 'light' | 'dark'

        const initialColorScheme = colorSchemeFromElement || 'auto'

        setColorScheme(initialColorScheme)
    }, [])

    // Funktion zum Wechseln des Farbschemas.
    const toggleColorScheme = () =>
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')

    return (
        <ActionIcon
            onClick={toggleColorScheme}
            variant="filled"
            size="lg"
            aria-label="Toggle color scheme"
            aria-hidden="true"
        >
            {colorScheme === 'dark' ? (
                <IconSun stroke={1.5} />
            ) : (
                <IconMoon stroke={1.5} />
            )}
        </ActionIcon>
    )
}
