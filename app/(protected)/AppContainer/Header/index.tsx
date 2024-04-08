import { Logo } from '@/_components/Logo'
import { Burger, Flex, Group, TextInput } from '@mantine/core'
import { ColorSchemeToggle } from '../ColorSchemeToggle'
import { PrimaryColorToggle } from '../PrimaryColorToggle'
import styles from './styles.module.css'
import { LogoutButton } from '../LogoutButton'

export const Header = ({
    isNavOpened,
    toggle,
}: {
    isNavOpened: boolean
    toggle: () => void
}) => {
    return (
        <Group
            pt="xs"
            gap={0}
            className={styles.headerContainer}
            data-testid="headerContainer"
        >
            <Flex
                align="center"
                ml="md"
                justify="space-between"
                className={styles.headerLeft}
                data-testid="headerLeft"
            >
                <Burger
                    hiddenFrom="sm"
                    opened={isNavOpened}
                    onClick={toggle}
                    size="sm"
                    data-testid="burger"
                />
                <Logo />
            </Flex>
            <Group
                className={styles.headerRight}
                justify="space-between"
                visibleFrom="sm"
                data-testid="headerRight"
            >
                <TextInput
                    visibleFrom="sm"
                    placeholder="Suche:"
                    className={styles.searchInput}
                ></TextInput>
                <Group>
                    <LogoutButton />
                    <ColorSchemeToggle />
                    <PrimaryColorToggle />
                </Group>
            </Group>
        </Group>
    )
}
