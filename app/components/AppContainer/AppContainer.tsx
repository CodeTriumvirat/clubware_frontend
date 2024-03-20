'use client'
import { AppShell, Skeleton, Burger, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export default function AppContainer({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [opened, { toggle }] = useDisclosure()

    return (
        <AppShell
            header={{ height: { base: 60, md: 70, lg: 80 } }}
            navbar={{
                width: { base: 200, md: 300, lg: 400 },
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
            </AppShell.Header>
            <AppShell.Navbar p="md">
                {Array(15)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} h={28} mt="sm" animate={false} />
                    ))}
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    )
}
