'use client'
import { AppShell, Burger, NavLink } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronRight, IconSettings } from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'

const navData = [
    { link: '/', label: 'Home', icon: IconSettings },
    { link: '/login', label: 'Login', icon: IconSettings },
    { link: '/profile', label: 'Profile', icon: IconSettings },
    {
        link: '/password-recovery',
        label: 'Password Recovery',
        icon: IconSettings,
    },
]

export default function AppContainer({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [opened, { toggle }] = useDisclosure()
    const [active, setActive] = useState(0)

    const navLinks = navData.map((item, index) => (
        <NavLink
            key={item.label}
            component={Link}
            href={item.link}
            label={item.label}
            leftSection={<item.icon stroke={1.5} />}
            rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
            variant="subtle"
            active={index === active}
            onClick={() => setActive(index)}
        />
    ))

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
            <AppShell.Navbar p="md">{navLinks}</AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    )
}
