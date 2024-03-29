'use client'
import { AppShell, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { LinkGroup } from '@/_components/LinkGroup'
import styles from './styles.module.css'
import { useState } from 'react'
import { Header } from '@/_components/Header'
import { navData } from './nav-data'

export default function AppContainer({
    children,
    isLoggedIn,
}: Readonly<{
    children: React.ReactNode
    isLoggedIn: boolean
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
                        width: { base: 250, md: 250, lg: 300 },
                        breakpoint: 'sm',
                        collapsed: { mobile: !isNavOpened },
                    }}
                    padding="md"
                >
                    <AppShell.Header>
                        <Header isNavOpened={isNavOpened} toggle={toggle} />
                    </AppShell.Header>
                    <AppShell.Navbar p="md">
                        <Stack>{links}</Stack>
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
