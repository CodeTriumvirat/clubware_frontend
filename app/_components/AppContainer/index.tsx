'use client'
import { AppShell, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { LinkGroup } from '@/_components/LinkGroup'
import styles from './styles.module.css'
import { useState } from 'react'
import { Header } from '@/_components/Header'
import { navData } from './nav-data'
import { UserButtonCard } from './UserButtonCard'

export default function AppContainer({
    children,
    isLoggedIn,
    setPrimaryColor,
}: Readonly<{
    children: React.ReactNode
    isLoggedIn: boolean
    setPrimaryColor: (color: string) => void
}>) {
    const [isNavOpened, { toggle }] = useDisclosure()

    const [openedNav, setOpenedNav] = useState('')

    const links = navData.map((item, index) => (
        <LinkGroup
            {...item}
            openedNav={openedNav}
            setOpenedNav={setOpenedNav}
            key={index}
        />
    ))

    return (
        <>
            {isLoggedIn && (
                <AppShell
                    className={styles.appShell}
                    withBorder={false}
                    header={{ height: { base: 50, md: 50, lg: 50 } }}
                    navbar={{
                        width: { base: 300, md: 300, lg: 300 },
                        breakpoint: 'sm',
                        collapsed: { mobile: !isNavOpened },
                    }}
                    padding="md"
                >
                    <AppShell.Header>
                        <Header
                            isNavOpened={isNavOpened}
                            toggle={toggle}
                            setPrimaryColor={setPrimaryColor}
                        />
                    </AppShell.Header>
                    <AppShell.Navbar p="sm">
                        <Stack justify="space-between" flex={1}>
                            <Stack>{links}</Stack>
                            <UserButtonCard />
                        </Stack>
                    </AppShell.Navbar>
                    <AppShell.Main>
                        <div className={styles.mainContainer}>{children}</div>
                    </AppShell.Main>
                </AppShell>
            )}
            {/* Shows login page if user is not logged in */}
            {!isLoggedIn && children}
        </>
    )
}
