'use client'
import { Header } from '@/_components/Header'
import { LinkGroup } from '@/_components/LinkGroup'
import { AppShell, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { use, useContext, useEffect, useState } from 'react'
import { UserButtonCard } from './UserButtonCard'
import { navDataAdmin, navDataNoAdmin } from './nav-data'
import styles from './styles.module.css'
import { UserContext } from '@/_context/UserContext'

export default function AppContainer({
    children,
    setPrimaryColor,
}: Readonly<{
    children: React.ReactNode
    setPrimaryColor: (color: string) => void
}>) {
    const [isNavOpened, { toggle }] = useDisclosure()
    const [openedNav, setOpenedNav] = useState('')
    const [navData, setNavData] = useState(navDataNoAdmin)

    const { userRole } = useContext(UserContext)

    useEffect(() => {
        if (userRole === 'admin') {
            setNavData(navDataAdmin)
        } else {
            setNavData(navDataNoAdmin)
        }
    }, [userRole])

    const links = navData.map((item, index) => (
        <LinkGroup
            {...item}
            openedNav={openedNav}
            setOpenedNav={setOpenedNav}
            key={index}
            toggle={toggle}
        />
    ))

    return (
        <>
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
                        <UserButtonCard setPrimaryColor={setPrimaryColor} />
                    </Stack>
                </AppShell.Navbar>
                <AppShell.Main>
                    <div className={styles.mainContainer}>{children}</div>
                </AppShell.Main>
            </AppShell>
        </>
    )
}
