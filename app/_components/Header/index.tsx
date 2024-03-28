import { Group, Flex, Burger, TextInput } from '@mantine/core'
import { Logo } from '@/_components/Logo'
import styles from './styles.module.css'
import { ColorSchemeToggle } from '../ColorSchemeToggle'

export const Header = ({
    isNavOpened,
    toggle,
}: {
    isNavOpened: boolean
    toggle: () => void
}) => {
    return (
        <Group gap={0} className={styles.headerContainer}>
            <Flex
                align="center"
                ml="md"
                justify="space-between"
                className={styles.headerLeft}
            >
                <Burger
                    hiddenFrom="sm"
                    opened={isNavOpened}
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
                <ColorSchemeToggle />
            </Flex>
        </Group>
    )
}
