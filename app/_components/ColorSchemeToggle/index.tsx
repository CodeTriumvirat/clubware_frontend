'use client'

import { Button, Group, useMantineColorScheme } from '@mantine/core'

export function ColorSchemeToggle() {
    const { setColorScheme } = useMantineColorScheme()

    return (
        <Group>
            <Button onClick={() => setColorScheme('light')}>Light</Button>
            <Button onClick={() => setColorScheme('dark')}>Dark</Button>
        </Group>
    )
}
