'use client'
import { AppShell, Burger, Flex, Group, TextInput, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
    IconAdjustments,
    IconBuildingWarehouse,
    IconCalendar,
    IconCalendarStats,
    IconConfetti,
    IconFileAnalytics,
    IconGauge,
    IconLock,
    IconNotes,
    IconPresentationAnalytics,
    IconUsers,
    IconJumpRope,
    IconHelpOctagon,
    IconBrandHipchat,
} from '@tabler/icons-react'
import { LinkGroup } from '@/_components/LinkGroup'
import styles from './styles.module.css'
import { useState } from 'react'
import { Logo } from '@/_components/Logo'

const mockdata = [
    { label: 'Dashboard', link: '/dashboard', icon: IconGauge },
    {
        label: 'Kalender',
        link: '/marketnews',
        icon: IconCalendar,
        links: [
            { label: 'Übersicht', link: '/a' },
            { label: 'Heute', link: '/b' },
            { label: 'Diese Woche', link: '/c' },
            { label: 'Diesen Monat', link: '/d' },
        ],
    },
    {
        label: 'Warenwirtschaft',
        link: '/releases',
        icon: IconBuildingWarehouse,
        links: [
            { label: 'Übersicht', link: '/' },
            { label: 'Bestand', link: '/' },
            { label: 'Einkaufsliste', link: '/' },
            { label: 'Produkte Hinzufügen', link: '/' },
            { label: 'Inventur', link: '/' },
        ],
    },
    {
        label: 'Veranstaltungen',
        link: '/analytics',
        icon: IconConfetti,
        links: [
            { label: 'Übersicht', link: '/' },
            { label: 'nächste Verantaltungen', link: '/' },
            { label: 'Veranstaltung hinzufügen', link: '/' },
        ],
    },
    { label: 'Mitarbeter*innen', link: '/analytics', icon: IconUsers },

    {
        label: 'Schichtplan',
        link: '/analytics',
        icon: IconJumpRope,
        links: [
            { label: 'Übersicht', link: '/' },
            { label: 'Schicht hinzufügen', link: '/' },
        ],
    },
    { label: 'F.A.Q.', link: '/settings', icon: IconHelpOctagon },
    { label: 'TurboChat3000', link: '/settings', icon: IconBrandHipchat },

    { label: 'Settings', link: '/settings', icon: IconAdjustments },
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
                <Group gap={0} className={styles.headerContainer}>
                    <Flex
                        align="center"
                        ml="md"
                        justify="space-between"
                        className={styles.headerLeft}
                    >
                        <Burger
                            hiddenFrom="sm"
                            opened={opened}
                            onClick={toggle}
                            size="sm"
                        />
                        <Logo />
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
