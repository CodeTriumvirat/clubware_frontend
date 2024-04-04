import { Logo } from '@/_components/Logo'
import { Burger, Flex, Group, TextInput } from '@mantine/core'
import { ColorSchemeToggle } from '../ColorSchemeToggle'
import { PrimaryColorToggle } from '../PrimaryColorToggle'
import styles from './styles.module.css'

export const Header = ({
    isNavOpened,
    toggle,
    setPrimaryColor,
}: {
    isNavOpened: boolean
    toggle: () => void
    setPrimaryColor: (color: string) => void
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
                // mt="xs"
                visibleFrom="sm"
                data-testid="headerRight"
            >
                <TextInput
                    visibleFrom="sm"
                    placeholder="Suche:"
                    className={styles.searchInput}
                ></TextInput>
                <Group>
                    <ColorSchemeToggle />
                    <PrimaryColorToggle setPrimaryColor={setPrimaryColor} />
                </Group>
            </Group>
        </Group>
    )
}
