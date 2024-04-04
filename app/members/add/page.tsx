'use client'
import {
    Button,
    Container,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
    Title,
} from '@mantine/core'
import { signup } from '@/(auth)/login/actions'
import { UserContext } from '@/_context/UserContext'
import { notifications } from '@mantine/notifications'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const { userRole } = useContext(UserContext)

    const [notificationShown, setNotificationShown] = useState(false)

    const router = useRouter()

    if (userRole !== 'admin' && !notificationShown) {
        notifications.show({
            title: 'Error',
            message: 'You are not authorized to view this page',
        })
        setNotificationShown(true)
        router.push('/members')
    }

    return (
        <Container size={420} my={40}>
            <Title ta="center" mb={12}>
                Add new User
            </Title>
            <Paper shadow="md" p={30} radius="md" mt="xl">
                <Stack>
                    <form>
                        <Stack>
                            <TextInput
                                label="Email"
                                placeholder="yourmail@example.com"
                                id="email"
                                name="email"
                                type="email"
                                required
                            />
                            <PasswordInput
                                label="Password"
                                placeholder="Your Password"
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                            <Button type="submit" fullWidth formAction={signup}>
                                Sign up
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Paper>
        </Container>
    )
}
