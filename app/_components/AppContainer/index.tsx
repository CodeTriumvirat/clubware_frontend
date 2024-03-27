'use client'
import { AppShell, Burger, Flex, Group, TextInput, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
    IconAdjustments,
    IconCalendarStats,
    IconFileAnalytics,
    IconGauge,
    IconLock,
    IconNotes,
    IconPresentationAnalytics,
} from '@tabler/icons-react'
import { LinkGroup } from '@/_components/LinkGroup'
import styles from './styles.module.css'
import { useState } from 'react'

const mockdata = [
    { label: 'Dashboard', link: '/dashboard', icon: IconGauge },
    {
        label: 'Market news',
        link: '/marketnews',
        icon: IconNotes,
        links: [
            { label: 'Overview', link: '/a' },
            { label: 'Forecasts', link: '/b' },
            { label: 'Outlook', link: '/c' },
            { label: 'Real time', link: '/d' },
        ],
    },
    {
        label: 'Releases',
        link: '/releases',
        icon: IconCalendarStats,
        links: [
            { label: 'Upcoming releases', link: '/' },
            { label: 'Previous releases', link: '/' },
            { label: 'Releases schedule', link: '/' },
        ],
    },
    { label: 'Analytics', link: '/analytics', icon: IconPresentationAnalytics },
    { label: 'Contracts', link: '/contracts', icon: IconFileAnalytics },
    { label: 'Settings', link: '/settings', icon: IconAdjustments },
    {
        label: 'Security',
        link: '/security',
        icon: IconLock,
        links: [
            { label: 'Enable 2FA', link: '/' },
            { label: 'Change password', link: '/' },
            { label: 'Recovery codes', link: '/' },
        ],
    },
]

export default function AppContainer({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [opened, { toggle }] = useDisclosure()

    const [openedNav, setOpenedNav] = useState('')

    const links = mockdata.map((item, index) => (
        <LinkGroup
            {...item}
            openedNav={openedNav}
            setOpenedNav={setOpenedNav}
            key={index}
        />
    ))

    return (
        <AppShell
            className={styles.appShell}
            withBorder={false}
            header={{ height: { base: 50, md: 50, lg: 50 } }}
            navbar={{
                width: { base: 250, md: 250, lg: 300 },
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group className={styles.headerContainer}>
                    <Flex align="center" className={styles.headerLeft}>
                        <Burger
                            hiddenFrom="sm"
                            opened={opened}
                            onClick={toggle}
                            size="sm"
                        />
                    </Flex>
                    <Flex
                        align="center"
                        className={styles.headerRight}
                        visibleFrom="sm"
                    >
                        <TextInput
                            placeholder="Suche:"
                            className={styles.searchInput}
                        ></TextInput>
                    </Flex>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Stack className={styles.navContainer}>{links}</Stack>
            </AppShell.Navbar>
            <AppShell.Main>
                <div className={styles.mainContainer}>{children}</div>
            </AppShell.Main>
        </AppShell>
    )
}
