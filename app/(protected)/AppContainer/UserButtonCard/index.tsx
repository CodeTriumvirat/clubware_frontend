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
import { ColorSchemeToggle } from '@/(protected)/AppContainer/ColorSchemeToggle'
import { PrimaryColorToggle } from '@/(protected)/AppContainer/PrimaryColorToggle'

export function UserButtonCard() {
    const { user, profilePictureUrl } = useContext(UserContext)
    return (
        <>
            <div>
                <Divider mb="sm" />
                <Group justify="space-between">
                    <UnstyledButton
                        component={Link}
                        href="/profile"
                        className={styles.userButton}
                    >
                        <Group wrap="nowrap" className={styles.card} p={4}>
                            <Avatar
                                src={profilePictureUrl}
                                alt="user avatar"
                            ></Avatar>
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
                    <Group hiddenFrom="sm">
                        <ColorSchemeToggle />
                        <PrimaryColorToggle />
                    </Group>
                </Group>
            </div>
        </>
    )
}
