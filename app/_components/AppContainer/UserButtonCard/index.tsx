'use client'

import {
    Group,
    Text,
    UnstyledButton,
    Avatar,
    Stack,
    Divider,
} from '@mantine/core'
import Link from 'next/link'
import styles from './styles.module.css'
import { useContext } from 'react'
import { UserContext } from '@/_context/UserContext'

export function UserButtonCard() {
    const { user } = useContext(UserContext)
    return (
        <>
            <UnstyledButton component={Link} href="/profile">
                <Divider mb="sm" />
                <Group wrap="nowrap" className={styles.card} p={4}>
                    <Avatar alt="user avatar"></Avatar>
                    <Stack gap={0}>
                        <Text size="sm" fw={500}>
                            {user?.first_name} {user?.last_name}
                        </Text>

                        <Text c="dimmed" size="xs">
                            {user?.email}
                        </Text>
                    </Stack>
                </Group>
            </UnstyledButton>
        </>
    )
}
