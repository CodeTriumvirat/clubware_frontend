import {
    Button,
    Divider,
    Flex,
    Group,
    NavLink,
    Stack,
    Text,
} from '@mantine/core'
import Link from 'next/link'
import styles from './styles.module.css'

export function LinkGroup({
    label,
    icon: IconComponent,
    link,
    links,
    openedNav,
    setOpenedNav,
}: {
    label: string
    icon: React.ElementType
    link: string
    links?: { label: string; link: string }[]
    openedNav: string
    setOpenedNav: (label: string) => void
}) {
    const toggleOpenedNav = () => {
        if (openedNav === label) {
            setOpenedNav('')
        } else {
            setOpenedNav(label)
        }
    }
    return (
        <>
            <Flex className={styles.navContainer}>
                {links && (
                    <NavLink
                        onClick={() => toggleOpenedNav()}
                        label={label}
                        leftSection={IconComponent && <IconComponent />}
                    />
                )}
                {!links && (
                    <NavLink
                        component={Link}
                        href={link}
                        onClick={() => toggleOpenedNav()}
                        label={label}
                        leftSection={IconComponent && <IconComponent />}
                    />
                )}
            </Flex>

            {links && openedNav === label && (
                <Group className={styles.linkGroupContainer}>
                    <Divider
                        className={styles.divider}
                        orientation="vertical"
                    ></Divider>
                    <Stack>
                        {links.map((link, index) => (
                            <NavLink
                                component={Link}
                                key={index}
                                href={link.link}
                                label={link.label}
                            ></NavLink>
                        ))}
                    </Stack>
                </Group>
            )}
        </>
    )
}
