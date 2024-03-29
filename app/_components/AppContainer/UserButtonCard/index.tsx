import {
    Card,
    Group,
    Text,
    UnstyledButton,
    Avatar,
    Stack,
    Divider,
} from '@mantine/core'
import Link from 'next/link'
import styles from './styles.module.css'

export function UserButtonCard() {
    return (
        <>
            <UnstyledButton component={Link} href="/profile">
                <Divider mb="sm" />
                <Group wrap="nowrap" className={styles.card} p={4}>
                    <Avatar alt="user avatar"></Avatar>
                    <Stack gap={0}>
                        <Text size="sm" fw={500}>
                            Harriette Spoonlicker
                        </Text>

                        <Text c="dimmed" size="xs">
                            hspoonlicker@outlook.com
                        </Text>
                    </Stack>
                </Group>
            </UnstyledButton>
        </>
    )
}
