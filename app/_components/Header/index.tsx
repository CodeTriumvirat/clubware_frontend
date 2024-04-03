import { Group, Flex, Burger, TextInput } from '@mantine/core'
import { Logo } from '@/_components/Logo'
import styles from './styles.module.css'
import { ColorSchemeToggle } from '../ColorSchemeToggle'
import { PrimaryColorToggle } from '../PrimaryColorToggle'

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
